import user from "../fixtures/auth-user.json";
import words from "../fixtures/words.json";
import wordsWithFavoriteOption from "../fixtures/words-with-favorite-option.json";

describe("dictionary spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
    cy.interceptGetLanguages();
  });

  describe("displaying list of words", () => {
    it("for an unauthenticated user", () => {
      cy.intercept(
        "GET",
        "/api/search?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
        {
          statusCode: 200,
          body: words
        }
      );

      cy.visit("/dashboard");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.assertWordCardsAreDisplayed(words.results);
    });

    it("for an authenticated user", () => {
      cy.intercept(
        "GET",
        "/api/search?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
        {
          statusCode: 200,
          body: wordsWithFavoriteOption
        }
      );

      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.assertWordCardsAreDisplayed(wordsWithFavoriteOption.results);
    });
  });
});
