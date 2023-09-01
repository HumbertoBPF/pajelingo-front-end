describe("not found spec", () => {
  it("should render not found page when any route is matched", () => {
    cy.visit("/invalid-route");

    cy.getByTestId("not-found").should(
      "have.text",
      "The page you are trying to access does not exist or was removed"
    );
  });
});
