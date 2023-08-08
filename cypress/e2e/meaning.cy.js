import user from "../fixtures/auth-user.json";
import words from "../fixtures/words.json";
import wordsWithFavoriteOption from "../fixtures/words-with-favorite-option.json";
import { faker } from "@faker-js/faker/locale/en_US";

describe("meaning spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
    cy.interceptGetLanguages();
  });

  describe("accessing the meaning of a word", () => {
    it("should access the meaning of a word for an unauthenticated user", () => {
      const randomIndex = faker.number.int({ min: 0, max: 11 });

      const randomWord = words.results[randomIndex];

      const mockedMeaning = {
        id: faker.number.int({ min: 1, max: 100 }),
        meaning: faker.lorem.words({ min: 3, max: 10 }),
        word: randomWord.id
      };

      cy.intercept(
        "GET",
        "/api/search?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
        {
          statusCode: 200,
          body: words
        }
      );

      cy.intercept("GET", `/api/words/${randomWord.id}`, {
        statusCode: 200,
        body: randomWord
      });

      cy.intercept("GET", `/api/meanings/${randomWord.id}`, {
        statusCode: 200,
        body: [mockedMeaning]
      });

      cy.visit("/dashboard");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.getByTestId(`${randomWord.id}-word-card`).click();

      cy.getByTestId("title").should(
        "have.text",
        `Meanings of "${randomWord.word_name}"`
      );

      cy.getByTestId(`${mockedMeaning.id}-meaning-card`).should(
        "have.text",
        `Meaning: ${mockedMeaning.meaning}`
      );

      cy.getByTestId("favorite-button").should("not.exist");
    });

    it("should access the meaning of a word for an authenticated user", () => {
      const randomIndex = faker.number.int({ min: 0, max: 11 });

      const randomWord = wordsWithFavoriteOption.results[randomIndex];

      const mockedMeaning = {
        id: faker.number.int({ min: 1, max: 100 }),
        meaning: faker.lorem.words({ min: 3, max: 10 }),
        word: randomWord.id
      };

      cy.intercept(
        "GET",
        `/api/search?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true`,
        {
          statusCode: 200,
          body: wordsWithFavoriteOption
        }
      );

      cy.intercept("GET", `/api/words/${randomWord.id}`, {
        statusCode: 200,
        body: randomWord
      });

      cy.intercept("GET", `/api/meanings/${randomWord.id}`, {
        statusCode: 200,
        body: [mockedMeaning]
      });

      cy.login(user.username, "str0ng-P@ssw0rd");

      cy.visit("/dashboard");

      cy.getByTestId("search-dropdown").click();
      cy.getByTestId("dictionary-item").click();

      cy.getByTestId(`${randomWord.id}-word-card`).click();

      cy.getByTestId("title").should(
        "have.text",
        `Meanings of "${randomWord.word_name}"`
      );

      cy.getByTestId(`${mockedMeaning.id}-meaning-card`).should(
        "have.text",
        `Meaning: ${mockedMeaning.meaning}`
      );

      const expectedText = randomWord.is_favorite
        ? " Remove from favorite words"
        : " Add to favorite words";
      cy.getByTestId("favorite-button").should("have.text", expectedText);
    });
  });
});
