import user from "../fixtures/auth-user.json";
import scores from "../fixtures/scores.json";

describe("delete profile spec", () => {
  it("should delete account when clicking on the delete button and confirming the action", () => {
    cy.interceptGetLanguages();
    cy.interceptGetGames();

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

    cy.intercept("GET", "/api/user", {
      statusCode: 403
    });

    cy.getByTestId("confirm-delete-input").type("permanently delete");
    cy.getByTestId("delete-button").click();

    cy.url().should("include", "/login");
  });
});
