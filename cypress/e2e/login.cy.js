import user from "../fixtures/auth-user.json";

describe("login spec", () => {
  it("should redirect user to the dashboard after a successful login", () => {
    cy.interceptGetGames();

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.url().should("include", "/dashboard");

    cy.getByTestId("profile-dropdown").should("have.text", ` ${user.username}`);
  });
});
