import { faker } from "@faker-js/faker/locale/en_US";
import games from "../fixtures/games.json";

describe("reset password spec", () => {
  it("should request reset password and effectively reset it", () => {
    cy.intercept("GET", "/api/games", {
      statusCode: 200,
      body: games
    });

    cy.intercept("POST", "/api/request-reset-account", {
      statusCode: 204
    });

    cy.intercept("PUT", "/api/reset-account/uid/token", {
      statusCode: 204
    });

    const email = faker.internet.email();

    cy.visit("/dashboard");

    cy.getByTestId("signin-button").click();
    cy.getByTestId("link-forgot-password").click();

    cy.getByTestId("email-input").find("input").type(email);
    cy.getByTestId("submit-button").click();

    cy.getByTestId("successful-request-alert").should(
      "have.text",
      "Check the specified email to reset your account. If there is an email associated with a Pajelingo account, you should have received an email with a reset link."
    );

    cy.visit("/reset-account/uid/token");

    cy.getByTestId("password-input").find("input").type("str0ng-P@ssw0rd");
    cy.getByTestId("confirm-password-input")
      .find("input")
      .type("str0ng-P@ssw0rd");
    cy.getByTestId("submit-button").click();

    cy.getByTestId("successful-reset-alert").should(
      "have.text",
      "Password successfully updated!"
    );
    cy.getByTestId("login-button").should("have.text", " Login");
    cy.getByTestId("dashboard-button").should("have.text", " Go to dashboard");
  });
});
