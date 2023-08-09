import user from "../../fixtures/auth-user.json";
import favoriteWords from "../../fixtures/favorite-words.json";
import wordsWithFavoriteOption from "../../fixtures/words-with-favorite-option.json";
import { faker } from "@faker-js/faker/locale/en_US";

const randomIndex = faker.number.int({ min: 0, max: 11 });
const randomWord = wordsWithFavoriteOption.results[randomIndex];
const randomFavoriteWord = favoriteWords.results[randomIndex];

describe("update favorite words spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
    cy.interceptGetLanguages();
  });

  describe("from dictionary page", () => {
    beforeEach(() => {
      cy.intercept("PUT", `/api/words/${randomWord.id}/favorite-word`, {
        statusCode: 200,
        body: { ...randomWord, is_favorite: !randomWord.is_favorite }
      });

      cy.intercept(
        "GET",
        "/api/search?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
        {
          statusCode: 200,
          body: wordsWithFavoriteOption
        }
      );
    });

    it("when clicking on the favorite word button", () => {
      const mockedMeaning = {
        id: faker.number.int({ min: 1, max: 100 }),
        meaning: faker.lorem.words({ min: 3, max: 10 }),
        word: randomWord.id
      };

      cy.intercept("GET", `/api/words/${randomWord.id}`, {
        statusCode: 200,
        body: randomWord
      });

      cy.intercept("GET", `/api/meanings/${randomWord.id}`, {
        statusCode: 200,
        body: [mockedMeaning]
      });

      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.getByTestId(`${randomWord.id}-word-card`).click();

      cy.getByTestId("favorite-button").click();

      const expectedText = randomWord.is_favorite
        ? " Add to favorite words"
        : " Remove from favorite words";
      cy.getByTestId("favorite-button").should("have.text", expectedText);

      cy.getByTestId("title").should(
        "have.text",
        `Meanings of "${randomWord.word_name}"`
      );

      cy.getByTestId(`${mockedMeaning.id}-meaning-card`).should(
        "have.text",
        `Meaning: ${mockedMeaning.meaning}`
      );
    });

    it("when clicking on the heart icon on the word card", () => {
      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      const heartIconTestIdBefore = randomWord.is_favorite
        ? "heart-filled-icon"
        : "heart-icon";
      cy.getByTestId(`${randomWord.id}-word-card`)
        .findByTestId(heartIconTestIdBefore)
        .click();

      const heartIconTestIdAfter = randomWord.is_favorite
        ? "heart-icon"
        : "heart-filled-icon";
      cy.getByTestId(`${randomWord.id}-word-card`)
        .findByTestId(heartIconTestIdAfter)
        .should("exist");
      cy.getByTestId(`${randomWord.id}-word-card`)
        .contains(randomWord.word_name)
        .should("have.text", randomWord.word_name);
    });
  });

  describe("from favorite words page", () => {
    beforeEach(() => {
      cy.intercept("PUT", `/api/words/${randomFavoriteWord.id}/favorite-word`, {
        statusCode: 200,
        body: { ...randomFavoriteWord, is_favorite: false }
      });

      cy.intercept(
        "GET",
        "/api/words/favorite-words?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
        {
          statusCode: 200,
          body: favoriteWords
        }
      );
    });

    it("when clicking on the favorite word button", () => {
      const mockedMeaning = {
        id: faker.number.int({ min: 1, max: 100 }),
        meaning: faker.lorem.words({ min: 3, max: 10 }),
        word: randomFavoriteWord.id
      };

      cy.intercept("GET", `/api/words/${randomFavoriteWord.id}`, {
        statusCode: 200,
        body: randomFavoriteWord
      });

      cy.intercept("GET", `/api/meanings/${randomFavoriteWord.id}`, {
        statusCode: 200,
        body: [mockedMeaning]
      });

      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.getByTestId("profile-dropdown").click();
      cy.getByTestId("profile-item").click();
      cy.getByTestId("favorite-item").click();

      cy.getByTestId(`${randomFavoriteWord.id}-word-card`).click();

      cy.getByTestId("favorite-button").click();

      cy.getByTestId("favorite-button").should(
        "have.text",
        " Add to favorite words"
      );

      cy.getByTestId("title").should(
        "have.text",
        `Meanings of "${randomFavoriteWord.word_name}"`
      );

      cy.getByTestId(`${mockedMeaning.id}-meaning-card`).should(
        "have.text",
        `Meaning: ${mockedMeaning.meaning}`
      );
    });

    it("when clicking on the heart icon on the word card", () => {
      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.getByTestId("profile-dropdown").click();
      cy.getByTestId("profile-item").click();
      cy.getByTestId("favorite-item").click();

      cy.getByTestId(`${randomFavoriteWord.id}-word-card`)
        .findByTestId("heart-filled-icon")
        .click();

      cy.getByTestId(`${randomFavoriteWord.id}-word-card`)
        .findByTestId("heart-icon")
        .should("exist");
      cy.getByTestId(`${randomFavoriteWord.id}-word-card`)
        .contains(randomFavoriteWord.word_name)
        .should("have.text", randomFavoriteWord.word_name);
    });
  });
});
