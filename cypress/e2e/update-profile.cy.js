import user from "../fixtures/auth-user.json";
import scores from "../fixtures/scores.json";
const { faker } = require("@faker-js/faker/locale/en_US");

describe("update profile spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
  });

  it("should update profile when submitting update account form", () => {
    const email = faker.internet.email();
    const username = faker.string.alphanumeric({ length: { min: 8, max: 64 } });
    const bio = faker.person.bio();

    const newUser = { ...user, username, email, bio };

    cy.interceptGetLanguages();

    cy.intercept("GET", "/api/scores/*", {
      statusCode: 200,
      body: scores
    });

    cy.intercept("PUT", "/api/user", {
      statusCode: 200,
      body: newUser
    });

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();
    cy.getByTestId("update-item").click();

    cy.getByTestId("email-input").find("input").as("emailInput");
    cy.get("@emailInput").clear();
    cy.get("@emailInput").type(email);

    cy.getByTestId("username-input").find("input").as("usernameInput");
    cy.get("@usernameInput").clear();
    cy.get("@usernameInput").type(username);

    cy.getByTestId("bio-input").find("textarea").as("bioInput");
    cy.get("@bioInput").clear();
    cy.get("@bioInput").type(bio);

    cy.getByTestId("password-input").find("input").as("passwordInput");
    cy.get("@passwordInput").clear();
    cy.get("@passwordInput").type("n3w-str0ng-p4ssw0rd");

    cy.getByTestId("password-confirmation-input")
      .find("input")
      .as("passwordConfirmationInput");
    cy.get("@passwordConfirmationInput").clear();
    cy.get("@passwordConfirmationInput").type("n3w-str0ng-p4ssw0rd");

    cy.intercept("GET", "/api/user", {
      statusCode: 200,
      body: newUser
    });

    cy.getByTestId("submit-button").click();

    cy.url().should("include", "/profile");

    cy.getByTestId("username-data").should(
      "have.text",
      ` Username: ${user.username}`
    );
    cy.getByTestId("email-data").should("have.text", ` Email: ${user.email}`);
    cy.getByTestId("bio-data").should("have.text", ` Bio: ${user.bio}`);
  });

  it("should redirect unauthenticated users to /login", () => {
    cy.visit("/update-account");

    cy.url().should("include", "/login");
  });
});
