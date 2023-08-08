import user from "../../fixtures/auth-user.json";

describe("logout spec", () => {
  it("should logout authenticated user", () => {
    cy.interceptGetGames();

    cy.login(user.username, "str0ng-P@ssw0rd");

    cy.getByTestId("profile-dropdown").should("have.text", ` ${user.username}`);

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("logout-item").click();

    cy.getByTestId("signup-button").should("have.text", " Sign up");
    cy.getByTestId("signin-button").should("have.text", " Sign in");

    cy.url().should("include", "/dashboard");
  });
});
