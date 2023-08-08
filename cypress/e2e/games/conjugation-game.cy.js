import user from "../../fixtures/auth-user.json";
import languages from "../../fixtures/languages.json";
const { faker } = require("@faker-js/faker/locale/en_US");

const languageIndex = faker.number.int({ min: 0, max: 4 });
const language = languages[languageIndex].language_name;

describe("conjugation game spec", () => {
  beforeEach(() => {
    cy.interceptGetLanguages();
    cy.interceptGetGames();

    cy.intercept("GET", `/api/conjugation-game?language=${language}`, {
      statusCode: 200,
      body: {
        id: 100,
        word: "Mocked word",
        tense: "Mocked tense"
      }
    });
  });

  describe("for non-authenticated users", () => {
    it("should display positive feedback when users provide the right answer", () => {
      cy.intercept("POST", "/api/conjugation-game", {
        statusCode: 200,
        body: {
          correct_answer:
            "Conjugation 1\nConjugation 2\nConjugation 3\nConjugation 4\nConjugation 5\nConjugation 6\n",
          result: true,
          score: null,
          new_badges: []
        }
      });

      cy.visit("/games");

      cy.getByTestId("3-game-card").click();

      cy.getByTestId("select-language").select(language);
      cy.getByTestId("start-button").click();

      cy.getByTestId("conjugation-1").find("input").type("Correct answer");
      cy.getByTestId("conjugation-2").find("input").type("Correct answer");
      cy.getByTestId("conjugation-3").find("input").type("Correct answer");
      cy.getByTestId("conjugation-4").find("input").type("Correct answer");
      cy.getByTestId("conjugation-5").find("input").type("Correct answer");
      cy.getByTestId("conjugation-6").find("input").type("Correct answer");

      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Correct answer :)");

      cy.getByTestId("1th-response-item").should("have.text", "Conjugation 1");
      cy.getByTestId("2th-response-item").should("have.text", "Conjugation 2");
      cy.getByTestId("3th-response-item").should("have.text", "Conjugation 3");
      cy.getByTestId("4th-response-item").should("have.text", "Conjugation 4");
      cy.getByTestId("5th-response-item").should("have.text", "Conjugation 5");
      cy.getByTestId("6th-response-item").should("have.text", "Conjugation 6");
    });

    it("should display negative feedback when users provide a wrong answer", () => {
      cy.intercept("POST", "/api/conjugation-game", {
        statusCode: 200,
        body: {
          correct_answer:
            "Conjugation 1\nConjugation 2\nConjugation 3\nConjugation 4\nConjugation 5\nConjugation 6\n",
          result: false,
          score: null,
          new_badges: []
        }
      });

      cy.visit("/games");

      cy.getByTestId("3-game-card").click();

      cy.getByTestId("select-language").select(language);
      cy.getByTestId("start-button").click();

      cy.getByTestId("conjugation-1").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-2").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-3").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-4").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-5").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-6").find("input").type("Wrong answer");

      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Wrong answer");

      cy.getByTestId("1th-response-item").should("have.text", "Conjugation 1");
      cy.getByTestId("2th-response-item").should("have.text", "Conjugation 2");
      cy.getByTestId("3th-response-item").should("have.text", "Conjugation 3");
      cy.getByTestId("4th-response-item").should("have.text", "Conjugation 4");
      cy.getByTestId("5th-response-item").should("have.text", "Conjugation 5");
      cy.getByTestId("6th-response-item").should("have.text", "Conjugation 6");
    });
  });

  describe("for authenticated users", () => {
    it("should display positive feedback when users provide the right answer", () => {
      const score = faker.number.int({ min: 1, max: 1000 });

      cy.intercept("POST", "/api/conjugation-game", {
        statusCode: 200,
        body: {
          correct_answer:
            "Conjugation 1\nConjugation 2\nConjugation 3\nConjugation 4\nConjugation 5\nConjugation 6\n",
          result: true,
          score,
          new_badges: []
        }
      });

      cy.login(user.username, "str0ng-p4ssw0rd");

      cy.visit("/games");

      cy.getByTestId("3-game-card").click();

      cy.getByTestId("select-language").select(language);
      cy.getByTestId("start-button").click();

      cy.getByTestId("conjugation-1").find("input").type("Correct answer");
      cy.getByTestId("conjugation-2").find("input").type("Correct answer");
      cy.getByTestId("conjugation-3").find("input").type("Correct answer");
      cy.getByTestId("conjugation-4").find("input").type("Correct answer");
      cy.getByTestId("conjugation-5").find("input").type("Correct answer");
      cy.getByTestId("conjugation-6").find("input").type("Correct answer");

      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Correct answer :)");

      cy.getByTestId("1th-response-item").should("have.text", "Conjugation 1");
      cy.getByTestId("2th-response-item").should("have.text", "Conjugation 2");
      cy.getByTestId("3th-response-item").should("have.text", "Conjugation 3");
      cy.getByTestId("4th-response-item").should("have.text", "Conjugation 4");
      cy.getByTestId("5th-response-item").should("have.text", "Conjugation 5");
      cy.getByTestId("6th-response-item").should("have.text", "Conjugation 6");
      cy.getByTestId("score").should("have.text", `Your score is ${score}`);
    });

    it("should display negative feedback when users provide a wrong answer", () => {
      cy.intercept("POST", "/api/conjugation-game", {
        statusCode: 200,
        body: {
          correct_answer:
            "Conjugation 1\nConjugation 2\nConjugation 3\nConjugation 4\nConjugation 5\nConjugation 6\n",
          result: false,
          score: null,
          new_badges: []
        }
      });

      cy.login(user.username, "str0ng-p4ssw0rd");

      cy.visit("/games");

      cy.getByTestId("3-game-card").click();

      cy.getByTestId("select-language").select(language);
      cy.getByTestId("start-button").click();

      cy.getByTestId("conjugation-1").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-2").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-3").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-4").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-5").find("input").type("Wrong answer");
      cy.getByTestId("conjugation-6").find("input").type("Wrong answer");

      cy.getByTestId("submit-answer-button").click();

      cy.getByTestId("feedback").should("have.text", "Wrong answer");
      cy.getByTestId("1th-response-item").should("have.text", "Conjugation 1");
      cy.getByTestId("2th-response-item").should("have.text", "Conjugation 2");
      cy.getByTestId("3th-response-item").should("have.text", "Conjugation 3");
      cy.getByTestId("4th-response-item").should("have.text", "Conjugation 4");
      cy.getByTestId("5th-response-item").should("have.text", "Conjugation 5");
      cy.getByTestId("6th-response-item").should("have.text", "Conjugation 6");
    });
  });
});
