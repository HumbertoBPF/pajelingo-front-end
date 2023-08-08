import user from "../../fixtures/auth-user.json";
import scores from "../../fixtures/scores.json";
import favoriteWords from "../../fixtures/favorite-words.json";

describe("profile spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
  });

  it("should see personal data when accessing profile", () => {
    cy.interceptGetLanguages();

    cy.intercept("GET", `/api/scores?language=English&user=${user.username}`, {
      statusCode: 200,
      body: scores
    });

    cy.intercept(
      "GET",
      "/api/words/favorite-words?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
      {
        statusCode: 200,
        body: favoriteWords
      }
    );

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();
    cy.getByTestId("favorite-item").click();

    cy.assertWordCardsAreDisplayed(favoriteWords.results);
  });

  it("should redirect unauthenticated users to /login", () => {
    cy.visit("/profile/favorite-words");

    cy.url().should("include", "/login");
    cy.getByTestId("signup-button").should("have.text", " Sign up");
    cy.getByTestId("signin-button").should("have.text", " Sign in");
  });
});
