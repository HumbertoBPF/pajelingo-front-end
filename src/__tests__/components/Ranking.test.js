const { screen, within } = require("@testing-library/react");
const { default: Ranking } = require("components/Ranking");
import { renderWithProviders } from "utils/test-utils";
const { getRandomInteger } = require("utils");

function getRankingRecords(n) {
  const records = [];

  for (let i = 0; i < n; i++) {
    records.push({
      user: "HumbertoBPF",
      score: getRandomInteger(100, 1000)
    });
  }

  return records;
}

it.each([
  [undefined],
  [
    {
      position: getRandomInteger(1, 10),
      user: "HumbertoBPF",
      score: getRandomInteger(100, 1000)
    }
  ]
])(" should display current page of the ranking", (userScore) => {
  const n = getRandomInteger(1, 10);

  const ranking = {
    page: getRandomInteger(1, 10),
    results: getRankingRecords(n)
  };

  if (userScore) {
    ranking.user_score = userScore;
  }

  const results = ranking.results;

  renderWithProviders(<Ranking ranking={ranking} />);

  const rankingHeaders = screen.getByTestId("ranking-headers");
  const positionRankingHeader = within(rankingHeaders).getByText("Position");
  const usernameRankingHeader = within(rankingHeaders).getByText("Username");
  const scoreRankingHeader = within(rankingHeaders).getByText("Score");

  const rankingSeparator = screen.queryByTestId("ranking-separator");
  const userRecord = screen.queryByTestId("user-score-record");

  expect(positionRankingHeader).toHaveTextContent("Position");
  expect(usernameRankingHeader).toHaveTextContent("Username");
  expect(scoreRankingHeader).toHaveTextContent("Score");

  for (let i = 0; i < n; i++) {
    const result = results[i];
    const expectedPosition = (ranking.page - 1) * 10 + i + 1;

    const record = screen.getByTestId(`${i + 1}th-ranking-record`);
    const recordPosition = within(record).getByText(`${expectedPosition}`);
    const recordUsername = within(record).getByText(`${result.user}`);
    const recordScore = within(record).getByText(`${result.score}`);

    expect(recordPosition).toHaveTextContent(`${expectedPosition}`);
    expect(recordUsername).toHaveTextContent(`${result.user}`);
    expect(recordScore).toHaveTextContent(`${result.score}`);
  }

  if (userScore) {
    const rankingSeparators = within(rankingSeparator).getAllByText("...");
    const userRecordPosition = within(userRecord).getByText(
      `(You) ${userScore.position}`
    );
    const userRecordUsername = within(userRecord).getByText(
      `${userScore.user}`
    );
    const userRecordScore = within(userRecord).getByText(`${userScore.score}`);

    expect(rankingSeparators.length).toBe(3);
    expect(userRecordPosition).toHaveTextContent(`(You) ${userScore.position}`);
    expect(userRecordUsername).toHaveTextContent(`${userScore.user}`);
    expect(userRecordScore).toHaveTextContent(`${userScore.score}`);
  } else {
    expect(rankingSeparator).not.toBeInTheDocument();
    expect(userRecord).not.toBeInTheDocument();
  }
});
