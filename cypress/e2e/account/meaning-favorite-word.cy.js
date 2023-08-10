import user from "../../fixtures/auth-user.json";
import scores from "../../fixtures/default-scores.json";
import favoriteWords from "../../fixtures/favorite-words.json";
import { faker } from "@faker-js/faker/locale/en_US";

const randomIndex = faker.number.int({ min: 0, max: 11 });

const randomFavoriteWord = favoriteWords.results[randomIndex];

const mockedMeaning = {
  id: faker.number.int({ min: 1, max: 100 }),
  meaning: faker.lorem.words({ min: 3, max: 10 }),
  word: randomFavoriteWord.id
};

describe("profile spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
    cy.interceptGetLanguages();

    cy.intercept("GET", `/api/scores?language=English&user=${user.username}`, {
      statusCode: 200,
      body: scores
    });

    cy.intercept(
      "GET",
      "/api/words/favorite-words?search=&page=1&English=true&French=true&Portuguese=true&Spanish=true&German=true",
      {
        statusCode: 200,
        body: favoriteWords
      }
    );

    cy.intercept("GET", `/api/words/${randomFavoriteWord.id}`, {
      statusCode: 200,
      body: randomFavoriteWord
    });

    cy.intercept("GET", `/api/meanings/${randomFavoriteWord.id}`, {
      statusCode: 200,
      body: [mockedMeaning]
    });
  });

  it("should see personal data when accessing profile", () => {
    cy.login(user.username, "str0ng-p4ssw0rd");

    cy.getByTestId("profile-dropdown").click();
    cy.getByTestId("profile-item").click();
    cy.getByTestId("favorite-item").click();

    cy.getByTestId(`${randomFavoriteWord.id}-word-card`).click();

    cy.getByTestId("title").should(
      "have.text",
      `Meanings of "${randomFavoriteWord.word_name}"`
    );

    cy.getByTestId(`${mockedMeaning.id}-meaning-card`).should(
      "have.text",
      `Meaning: ${mockedMeaning.meaning}`
    );

    cy.getByTestId("favorite-button").should(
      "have.text",
      " Remove from favorite words"
    );
  });
});
