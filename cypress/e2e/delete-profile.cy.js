import user from "../fixtures/auth-user.json";
import languages from "../fixtures/languages.json";
import games from "../fixtures/games.json";
import scores from "../fixtures/scores.json";

describe("delete profile spec", () => {
  it("should delete account when clicking on the delete button and confirming the action", () => {
    cy.intercept("GET", "/api/languages", {
      statusCode: 200,
      body: languages
    });

    cy.intercept("GET", "/api/games", {
      statusCode: 200,
      body: games
    });

    cy.intercept("GET", "/api/scores/*", {
      statusCode: 200,
      body: scores
    });

    cy.intercept("DELETE", "/api/user", {
      statusCode: 204
    });

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();
    cy.getByTestId("delete-item").click();

    cy.getByTestId("confirm-delete-input").type("permanently delete");
    cy.getByTestId("delete-button").click();

    cy.intercept("GET", "/api/user", {
      statusCode: 403
    });

    cy.url().should("include", "/login");
  });
});
