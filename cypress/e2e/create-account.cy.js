import { faker } from "@faker-js/faker/locale/en_US";
import games from "../fixtures/games.json";

describe("create account spec", () => {
  it("should fill the signin form and activate account", () => {
    const email = faker.internet.email();
    const username = faker.string.alphanumeric({ length: { min: 8, max: 64 } });
    const bio = faker.person.bio();

    cy.intercept("GET", "/api/games", {
      statusCode: 200,
      body: games
    });

    cy.intercept("POST", "/api/user", {
      statusCode: 201,
      body: {
        username,
        email,
        bio,
        picture: null,
        badges: []
      }
    });

    cy.intercept("PUT", "/api/activate/uid/token", {
      statusCode: 204
    });

    cy.visit("/dashboard");

    cy.getByTestId("signup-button").click();

    cy.url().should("include", "/signup");

    cy.getByTestId("email-input").find("input").type(email);
    cy.getByTestId("username-input").find("input").type(username);
    cy.getByTestId("bio-input").find("textarea").type(bio);
    cy.getByTestId("password-input").find("input").type("str0ng-p4ssw0rd");
    cy.getByTestId("password-confirmation-input")
      .find("input")
      .type("str0ng-p4ssw0rd");

    cy.getByTestId("submit-button").click();

    cy.getByTestId("success-alert").should(
      "have.text",
      "Account successfully created. Please check your email to activate it."
    );

    cy.visit("/activate/uid/token");

    cy.getByTestId("success-alert").should(
      "have.text",
      "Thank you for your email confirmation. Now you can sign in your account."
    );
  });
});
