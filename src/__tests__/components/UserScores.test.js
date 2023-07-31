const { screen, within } = require("@testing-library/react");
const { default: UserScores } = require("components/UserScores");
const { renderWithProviders } = require("test-utils/store");
const { faker } = require("@faker-js/faker/locale/en_US");

function getUserScores(n) {
  const userScores = [];

  for (let i = 0; i < n; i++) {
    userScores.push({
      game: "Game name",
      score: faker.number.int({ min: 100, max: 100 })
    });
  }

  return userScores;
}

it("should render the scores of a user", () => {
  const n = faker.number.int({ min: 3, max: 5 });
  const scores = getUserScores(n);

  renderWithProviders(<UserScores scores={scores} />);

  const headers = screen.getByTestId("user-scores-headers");

  const gameHeader = within(headers).getByText("Game");
  const scoreHeader = within(headers).getByText("Score");

  expect(gameHeader).toBeInTheDocument();
  expect(scoreHeader).toBeInTheDocument();

  for (let i = 0; i < n; i++) {
    const score = scores[i];

    const record = screen.getByTestId(`${i + 1}th-ranking-record`);

    const recordGame = within(record).getByText(score.game);
    const recordScore = within(record).getByText(score.score);

    expect(recordGame).toBeInTheDocument();
    expect(recordScore).toBeInTheDocument();
  }
});
