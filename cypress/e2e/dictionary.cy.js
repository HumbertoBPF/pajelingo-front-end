import languages from "../fixtures/languages.json";
import user from "../fixtures/auth-user.json";
import words from "../fixtures/words.json";
import filteredWords from "../fixtures/filtered-words.json";
import wordsWithFavoriteOption from "../fixtures/words-with-favorite-option.json";
import filteredWordsWithFavoriteOption from "../fixtures/filtered-words-with-favorite-option.json";
const { faker } = require("@faker-js/faker/locale/en_US");

const randomIndex = faker.number.int({ min: 0, max: 4 });
const randomLanguage = languages[randomIndex].language_name;
const randomPattern = faker.lorem.word();

let languagesRegExp = "";

languages.forEach((language) => {
  if (language.language_name !== randomLanguage) {
    languagesRegExp += `&${language.language_name}=true`;
  }
});

const searchUrl =
  "/api/search?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true";
const regexFilterUrl = `/api/search\\?search=${randomPattern}&page=1${languagesRegExp}`;

describe("dictionary spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
    cy.interceptGetLanguages();
  });

  describe("displaying list of words", () => {
    it("for an unauthenticated user", () => {
      cy.intercept("GET", new RegExp(regexFilterUrl), {
        statusCode: 200,
        body: filteredWords
      });

      cy.intercept("GET", searchUrl, {
        statusCode: 200,
        body: words
      });

      cy.visit("/dashboard");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.assertWordCardsAreDisplayed(words.results);

      cy.getByTestId("filter-button").click();

      cy.getByTestId("search-input").find("input").type(randomPattern);
      cy.getByTestId(`${randomLanguage}-check-item`).click();
      cy.getByTestId("apply-filters-button").click();

      cy.assertWordCardsAreDisplayed(filteredWords.results);
    });

    it("for an authenticated user", () => {
      cy.intercept("GET", new RegExp(regexFilterUrl), {
        statusCode: 200,
        body: filteredWordsWithFavoriteOption
      });

      cy.intercept("GET", searchUrl, {
        statusCode: 200,
        body: wordsWithFavoriteOption
      });

      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.assertWordCardsAreDisplayed(wordsWithFavoriteOption.results);

      cy.getByTestId("filter-button").click();

      cy.getByTestId("search-input").find("input").type(randomPattern);
      cy.getByTestId(`${randomLanguage}-check-item`).click();
      cy.getByTestId("apply-filters-button").click();

      cy.assertWordCardsAreDisplayed(filteredWordsWithFavoriteOption.results);
    });
  });
});
