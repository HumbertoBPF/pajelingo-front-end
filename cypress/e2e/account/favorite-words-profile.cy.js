import user from "../../fixtures/auth-user.json";
import scores from "../../fixtures/scores.json";
import favoriteWords from "../../fixtures/favorite-words.json";
import filteredFavoriteWords from "../../fixtures/filtered-favorite-words.json";
import languages from "../../fixtures/languages.json";
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
  "/api/words/favorite-words?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true";
const regexFilterUrl = `/api/words/favorite-words\\?search=${randomPattern}&page=1${languagesRegExp}`;

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

    cy.intercept("GET", new RegExp(regexFilterUrl), {
      statusCode: 200,
      body: filteredFavoriteWords
    });

    cy.intercept("GET", searchUrl, {
      statusCode: 200,
      body: favoriteWords
    });

    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();
    cy.getByTestId("favorite-item").click();

    cy.assertWordCardsAreDisplayed(favoriteWords.results);

    cy.getByTestId("filter-button").click();

    cy.getByTestId("search-input").find("input").type(randomPattern);
    cy.getByTestId(`${randomLanguage}-check-item`).click();
    cy.getByTestId("apply-filters-button").click();

    cy.assertWordCardsAreDisplayed(filteredFavoriteWords.results);
  });

  it("should redirect unauthenticated users to /login", () => {
    cy.visit("/profile/favorite-words");

    cy.url().should("include", "/login");
    cy.getByTestId("signup-button").should("have.text", " Sign up");
    cy.getByTestId("signin-button").should("have.text", " Sign in");
  });
});
