import { faker } from "@faker-js/faker/locale/en_US";
import accounts from "../fixtures/accounts.json";
import scores from "../fixtures/scores.json";

describe("search account spec", () => {
  it("should search account and select one", () => {
    const username = faker.internet.userName();
    const randomIndex = faker.number.int({ min: 0, max: 9 });

    const randomAccount = accounts.results[randomIndex];

    cy.interceptGetGames();
    cy.interceptGetLanguages();

    cy.intercept("GET", "/api/scores/*", {
      statusCode: 200,
      body: scores
    });

    cy.intercept("GET", `/api/accounts?q=${username}&page=1`, {
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

    cy.url().should("include", "/accounts");

    cy.getByTestId("search-input").find("input").type(username);
    cy.getByTestId("submit-button").click();

    cy.getByTestId(`${randomAccount.username}-card`).click();

    cy.url().should("include", `/accounts/${randomAccount.username}`);

    cy.getByTestId("username-data").should(
      "have.text",
      ` Username: ${randomAccount.username}`
    );
    cy.getByTestId("bio-data").should(
      "have.text",
      ` Bio: ${randomAccount.bio ? randomAccount.bio : "-"}`
    );
  });
});
