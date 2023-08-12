import { faker } from "@faker-js/faker/locale/en_US";
import accounts from "../../fixtures/accounts.json";
import scores from "../../fixtures/default-scores.json";

describe("search account spec", () => {
  it("should search account and select one", () => {
    const randomIndex = faker.number.int({ min: 0, max: 9 });

    const randomAccount = accounts.results[randomIndex];

    cy.interceptGetGames();
    cy.interceptGetLanguages();

    cy.intercept(
      "GET",
      `/api/scores?language=English&user=${randomAccount.username}`,
      {
        statusCode: 200,
        body: scores
      }
    );

    cy.intercept("GET", `/api/accounts?q=${randomAccount.username}&page=1`, {
      statusCode: 200,
      body: accounts
    });

    cy.intercept("GET", `/api/accounts/${randomAccount.username}`, {
      statusCode: 200,
      body: randomAccount
    });

    cy.visit("/dashboard");

    cy.getByTestId("search-dropdown").click();
    cy.getByTestId("account-item").click();

    cy.getByTestId("search-input").find("input").type(randomAccount.username);
    cy.getByTestId("submit-button").click();

    cy.getByTestId(`${randomAccount.username}-card`).click();

    cy.getByTestId("username-data").should(
      "have.text",
      ` Username: ${randomAccount.username}`
    );
    cy.getByTestId("bio-data").should(
      "have.text",
      ` Bio: ${randomAccount.bio ? randomAccount.bio : "-"}`
    );

    cy.assertUserScores(scores);
  });
});
