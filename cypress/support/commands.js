// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import user from "../fixtures/auth-user.json";
import games from "../fixtures/games.json";
import languages from "../fixtures/languages.json";

Cypress.Commands.add("getByTestId", (testId) => {
  cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add(
  "findByTestId",
  { prevSubject: true },
  (subject, testId) => {
    return subject.find(`[data-testid="${testId}"]`);
  }
);

Cypress.Commands.add("login", (username, password) => {
  cy.intercept("POST", "/api/user-token", {
    statusCode: 200,
    body: {
      token: "user-token"
    }
  });

  cy.intercept("GET", "/api/user", {
    statusCode: 200,
    body: user
  });

  cy.visit("/login");

  cy.getByTestId("username-input").type(username);
  cy.getByTestId("password-input").type(password);
  cy.getByTestId("login-button").click();
});

Cypress.Commands.add("interceptGetGames", () => {
  cy.intercept("GET", "/api/games", {
    statusCode: 200,
    body: games
  });
});

Cypress.Commands.add("interceptGetLanguages", () => {
  cy.intercept("GET", "/api/languages", {
    statusCode: 200,
    body: languages
  });
});

Cypress.Commands.add("assertRankingRecordsAreDisplayed", (rankingRecords) => {
  rankingRecords.forEach((record, index) => {
    cy.getByTestId(`${index + 1}th-ranking-record`)
      .find("td")
      .as("cols");
    cy.get("@cols").eq(0).should("have.text", `${record.position}`);
    cy.get("@cols").eq(1).should("have.text", `${record.user}`);
    cy.get("@cols").eq(2).should("have.text", `${record.score}`);
  });
});

Cypress.Commands.add("assertWordCardsAreDisplayed", (words) => {
  words.forEach((word) => {
    cy.getByTestId(`${word.id}-word-card`).as("wordCard");

    cy.get("@wordCard")
      .contains(word.word_name)
      .should("have.text", word.word_name);

    if (word.is_favorite === null) {
      cy.get("@wordCard").findByTestId("heart-filled-icon").should("not.exist");
      cy.get("@wordCard").findByTestId("heart-icon").should("not.exist");
    } else {
      if (word.is_favorite) {
        cy.get("@wordCard").findByTestId("heart-filled-icon").should("exist");
        cy.get("@wordCard").findByTestId("heart-icon").should("not.exist");
      } else {
        cy.get("@wordCard")
          .findByTestId("heart-filled-icon")
          .should("not.exist");
        cy.get("@wordCard").findByTestId("heart-icon").should("exist");
      }
    }
  });
});

Cypress.Commands.add("assertUserScores", (scores) => {
  cy.getByTestId("user-scores-headers").find("th").as("headers");
  cy.get("@headers").eq(0).should("have.text", "Game");
  cy.get("@headers").eq(1).should("have.text", "Score");

  scores.forEach((score, index) => {
    cy.getByTestId(`${index + 1}th-ranking-record`)
      .find("td")
      .as("cols");
    cy.get("@cols").eq(0).should("have.text", `${score.game}`);
    cy.get("@cols").eq(1).should("have.text", `${score.score}`);
  });
});
