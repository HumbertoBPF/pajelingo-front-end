import user from "../fixtures/auth-user.json";
import languages from "../fixtures/languages.json";
import games from "../fixtures/games.json";
import scores from "../fixtures/scores.json";

describe("profile spec", () => {
  it("should see personal data when accessing profile", () => {
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

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();

    cy.url().should("include", "/profile");

    cy.getByTestId("username-data").should(
      "have.text",
      ` Username: ${user.username}`
    );
    cy.getByTestId("email-data").should("have.text", ` Email: ${user.email}`);
    cy.getByTestId("bio-data").should("have.text", ` Bio: ${user.bio}`);
  });

  it("should redirect unauthenticated users to /login", () => {
    cy.intercept("GET", "/api/games", {
      statusCode: 200,
      body: games
    });

    cy.visit("/profile");

    cy.url().should("include", "/login");
    cy.getByTestId("signup-button").should("have.text", " Sign up");
    cy.getByTestId("signin-button").should("have.text", " Sign in");
  });
});
