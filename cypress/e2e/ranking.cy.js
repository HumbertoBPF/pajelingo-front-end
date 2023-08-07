import defaultRanking from "../fixtures/default-ranking.json";
import filteredRanking from "../fixtures/filtered-ranking.json";
import languages from "../fixtures/languages.json";
import user from "../fixtures/auth-user.json";
import scores from "../fixtures/scores.json";
import { faker } from "@faker-js/faker/locale/en_US";

const randomIndex = faker.number.int({ min: 1, max: 4 });

const defaultLanguage = languages[0].language_name;
const randomLanguage = languages[randomIndex].language_name;

describe("ranking spec", () => {
  beforeEach(() => {
    cy.interceptGetGames();
    cy.interceptGetLanguages();
  });

  describe("should display ranking page with selected language", () => {
    it("for an unauthenticated user", () => {
      cy.intercept("GET", `/api/rankings?language=${defaultLanguage}&page=1`, {
        statusCode: 200,
        body: defaultRanking
      });

      cy.intercept("GET", `/api/rankings?language=${randomLanguage}&page=1`, {
        statusCode: 200,
        body: filteredRanking
      });

      cy.visit("/dashboard");

      cy.getByTestId("games-dropdown").click();
      cy.getByTestId("rankings-item").click();

      cy.url().should("include", "/ranking");

      cy.assertRankingRecordsAreDisplayed(defaultRanking.results);

      cy.getByTestId("select-language").select(randomLanguage);

      cy.assertRankingRecordsAreDisplayed(filteredRanking.results);
    });

    it("for an authenticated user", () => {
      cy.login(user.username, "str0ng-P4ssw0rd");

      const userScore = {
        position: faker.number.int({ min: 1, max: 100 }),
        user: user.username,
        score: faker.number.int({ min: 1, max: 100 })
      };

      cy.intercept(
        "GET",
        `/api/rankings?language=${defaultLanguage}&page=1&user=${user.username}`,
        {
          statusCode: 200,
          body: {
            ...defaultRanking,
            user_score: userScore
          }
        }
      );

      cy.intercept(
        "GET",
        `/api/rankings?language=${randomLanguage}&page=1&user=${user.username}`,
        {
          statusCode: 200,
          body: {
            ...filteredRanking,
            user_score: userScore
          }
        }
      );

      cy.visit("/dashboard");

      cy.getByTestId("games-dropdown").click();
      cy.getByTestId("rankings-item").click();

      cy.url().should("include", "/ranking");

      cy.assertRankingRecordsAreDisplayed(defaultRanking.results);

      cy.getByTestId("ranking-separator").find("td").as("cols");
      cy.get("@cols").eq(0).should("have.text", "...");
      cy.get("@cols").eq(1).should("have.text", "...");
      cy.get("@cols").eq(2).should("have.text", "...");

      cy.getByTestId("user-score-record").find("th").as("cols");
      cy.get("@cols").eq(0).should("have.text", `(You) ${userScore.position}`);
      cy.get("@cols").eq(1).should("have.text", user.username);
      cy.get("@cols").eq(2).should("have.text", `${userScore.score}`);

      cy.getByTestId("select-language").select(randomLanguage);

      cy.assertRankingRecordsAreDisplayed(filteredRanking.results);

      cy.getByTestId("ranking-separator").find("td").as("cols");
      cy.get("@cols").eq(0).should("have.text", "...");
      cy.get("@cols").eq(1).should("have.text", "...");
      cy.get("@cols").eq(2).should("have.text", "...");

      cy.getByTestId("user-score-record").find("th").as("cols");
      cy.get("@cols").eq(0).should("have.text", `(You) ${userScore.position}`);
      cy.get("@cols").eq(1).should("have.text", user.username);
      cy.get("@cols").eq(2).should("have.text", `${userScore.score}`);
    });
  });

  describe("account access", () => {
    it("should access an account when clicking on ranking item", () => {
      const randomIndex = faker.number.int({ min: 0, max: 9 });
      const randomRankingItem = defaultRanking.results[randomIndex];
      const randomAccount = {
        username: randomRankingItem.user,
        bio: faker.person.bio(),
        picture: null,
        badges: []
      };

      cy.intercept("GET", `/api/rankings?language=English&page=1`, {
        statusCode: 200,
        body: defaultRanking
      });

      cy.intercept("GET", `/api/accounts/${randomAccount.username}`, {
        statusCode: 200,
        body: randomAccount
      });

      cy.intercept(
        "GET",
        `/api/scores?language=English&user=${randomAccount.username}`,
        {
          statusCode: 200,
          body: scores
        }
      );

      cy.visit("/dashboard");

      cy.getByTestId("games-dropdown").click();
      cy.getByTestId("rankings-item").click();

      cy.url().should("include", "/ranking");

      cy.getByTestId(`${randomIndex + 1}th-ranking-record`).click();

      cy.url().should("include", `/accounts/${randomAccount.username}`);

      cy.getByTestId("username-data").should(
        "have.text",
        ` Username: ${randomAccount.username}`
      );
      cy.getByTestId("bio-data").should(
        "have.text",
        ` Bio: ${randomAccount.bio}`
      );
    });
  });
});
