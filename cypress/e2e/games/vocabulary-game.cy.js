import user from "../../fixtures/auth-user.json";
import languages from "../../fixtures/languages.json";
const { faker } = require("@faker-js/faker/locale/en_US");

const baseLanguageIndex = faker.number.int({ min: 0, max: 2 });
const targetLanguageIndex = faker.number.int({ min: 3, max: 4 });

const baseLanguage = languages[baseLanguageIndex].language_name;
const targetLanguage = languages[targetLanguageIndex].language_name;

describe("vocabulary game spec", () => {
  beforeEach(() => {
    cy.interceptGetLanguages();
    cy.interceptGetGames();

    cy.intercept(
      "GET",
      `/api/vocabulary-game?base_language=${baseLanguage}&target_language=${targetLanguage}`,
      {
        statusCode: 200,
        body: {
          id: 100,
          word: "Mocked word"
        }
      }
    );
  });

  describe("for non-authenticated users", () => {
    it("should display positive feedback when users provide the right answer", () => {
      cy.intercept("POST", "/api/vocabulary-game", {
        statusCode: 200,
        body: {
          correct_answer: "Mocked word: Correct answer",
          result: true,
          score: null,
          new_badges: []
        }
      });

      cy.visit("/games");

      cy.getByTestId("1-game-card").click();

      cy.getByTestId("select-base-language").select(baseLanguage);
      cy.getByTestId("select-target-language").select(targetLanguage);
      cy.getByTestId("start-button").click();

      cy.getByTestId("answer-input").type("Correct answer");
      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Correct answer :)");
      cy.getByTestId("unique-response-item").should(
        "have.text",
        "Mocked word: Correct answer"
      );
    });

    it("should display negative feedback when users provide a wrong answer", () => {
      cy.intercept("POST", "/api/vocabulary-game", {
        statusCode: 200,
        body: {
          correct_answer: "Mocked word: Correct answer",
          result: false,
          score: null,
          new_badges: []
        }
      });

      cy.visit("/games");

      cy.getByTestId("1-game-card").click();

      cy.getByTestId("select-base-language").select(baseLanguage);
      cy.getByTestId("select-target-language").select(targetLanguage);
      cy.getByTestId("start-button").click();

      cy.getByTestId("answer-input").type("Correct answer");
      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Wrong answer");
      cy.getByTestId("unique-response-item").should(
        "have.text",
        "Mocked word: Correct answer"
      );
    });
  });

  describe("for authenticated users", () => {
    it("should display positive feedback when users provide the right answer", () => {
      const score = faker.number.int({ min: 1, max: 1000 });

      cy.intercept("POST", "/api/vocabulary-game", {
        statusCode: 200,
        body: {
          correct_answer: "Mocked word: Correct answer",
          result: true,
          score,
          new_badges: []
        }
      });

      cy.login(user.username, "str0ng-p4ssw0rd");

      cy.visit("/games");

      cy.getByTestId("1-game-card").click();

      cy.getByTestId("select-base-language").select(baseLanguage);
      cy.getByTestId("select-target-language").select(targetLanguage);
      cy.getByTestId("start-button").click();

      cy.getByTestId("answer-input").type("Correct answer");
      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Correct answer :)");
      cy.getByTestId("unique-response-item").should(
        "have.text",
        "Mocked word: Correct answer"
      );
      cy.getByTestId("score").should("have.text", `Your score is ${score}`);
    });

    it("should display negative feedback when users provide a wrong answer", () => {
      cy.intercept("POST", "/api/vocabulary-game", {
        statusCode: 200,
        body: {
          correct_answer: "Mocked word: Correct answer",
          result: false,
          score: null,
          new_badges: []
        }
      });

      cy.login(user.username, "str0ng-p4ssw0rd");

      cy.visit("/games");

      cy.getByTestId("1-game-card").click();

      cy.getByTestId("select-base-language").select(baseLanguage);
      cy.getByTestId("select-target-language").select(targetLanguage);
      cy.getByTestId("start-button").click();

      cy.getByTestId("answer-input").type("Correct answer");
      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Wrong answer");
      cy.getByTestId("unique-response-item").should(
        "have.text",
        "Mocked word: Correct answer"
      );
    });
  });
});
