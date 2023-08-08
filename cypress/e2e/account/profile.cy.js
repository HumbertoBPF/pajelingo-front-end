import user from "../../fixtures/auth-user.json";
import scores from "../../fixtures/scores.json";

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

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();

    cy.getByTestId("username-data").should(
      "have.text",
      ` Username: ${user.username}`
    );
    cy.getByTestId("email-data").should("have.text", ` Email: ${user.email}`);
    cy.getByTestId("bio-data").should("have.text", ` Bio: ${user.bio}`);
  });

  it("should redirect unauthenticated users to /login", () => {
    cy.visit("/profile");

    cy.url().should("include", "/login");
    cy.getByTestId("signup-button").should("have.text", " Sign up");
    cy.getByTestId("signin-button").should("have.text", " Sign in");
  });
});
