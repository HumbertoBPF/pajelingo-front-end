const { screen, within } = require("@testing-library/react");
const { default: Ranking } = require("components/Ranking");
import { renderWithProviders } from "test-utils/store";
const { getRandomInteger } = require("utils");

const getRankingRecords = (n) => {
  const records = [];

  for (let i = 0; i < n; i++) {
    records.push({
      user: "HumbertoBPF",
      score: getRandomInteger(100, 1000)
    });
  }

  return records;
};

const assertRankingHeaders = () => {
  const rankingHeaders = screen.getByTestId("ranking-headers");

  const positionRankingHeader = within(rankingHeaders).getByText("Position");
  expect(positionRankingHeader).toBeInTheDocument();
  expect(positionRankingHeader).toHaveTextContent("Position");

  const usernameRankingHeader = within(rankingHeaders).getByText("Username");
  expect(usernameRankingHeader).toBeInTheDocument();
  expect(usernameRankingHeader).toHaveTextContent("Username");

  const scoreRankingHeader = within(rankingHeaders).getByText("Score");
  expect(scoreRankingHeader).toBeInTheDocument();
  expect(scoreRankingHeader).toHaveTextContent("Score");
};

const assertRankingRecords = (page, results) => {
  const n = results.length;

  for (let i = 0; i < n; i++) {
    const result = results[i];
    const expectedPosition = (page - 1) * 10 + i + 1;

    const record = screen.getByTestId(`${i + 1}th-ranking-record`);

    const recordPosition = within(record).getByText(`${expectedPosition}`);
    expect(recordPosition).toBeInTheDocument();
    expect(recordPosition).toHaveTextContent(`${expectedPosition}`);

    const recordUsername = within(record).getByText(`${result.user}`);
    expect(recordUsername).toBeInTheDocument();
    expect(recordUsername).toHaveTextContent(`${result.user}`);

    const recordScore = within(record).getByText(`${result.score}`);
    expect(recordScore).toBeInTheDocument();
    expect(recordScore).toHaveTextContent(`${result.score}`);
  }
};

describe("should display the current page of the ranking", () => {
  it("without the user score", () => {
    const n = getRandomInteger(1, 10);

    const ranking = {
      page: getRandomInteger(1, 10),
      results: getRankingRecords(n)
    };

    const results = ranking.results;

    renderWithProviders(<Ranking ranking={ranking} />);

    assertRankingHeaders();
    assertRankingRecords(ranking.page, results);

    const rankingSeparator = screen.queryByTestId("ranking-separator");
    expect(rankingSeparator).not.toBeInTheDocument();

    const userRecord = screen.queryByTestId("user-score-record");
    expect(userRecord).not.toBeInTheDocument();
  });

  it("with user score", () => {
    const n = getRandomInteger(1, 10);

    const userScore = {
      position: getRandomInteger(1, 10),
      user: "HumbertoBPF",
      score: getRandomInteger(100, 1000)
    };

    const ranking = {
      page: getRandomInteger(1, 10),
      results: getRankingRecords(n),
      user_score: userScore
    };

    const results = ranking.results;

    renderWithProviders(<Ranking ranking={ranking} />);

    assertRankingHeaders();
    assertRankingRecords(ranking.page, results);

    const rankingSeparator = screen.queryByTestId("ranking-separator");

    const rankingSeparators = within(rankingSeparator).getAllByText("...");
    expect(rankingSeparators.length).toBe(3);

    const userRecord = screen.queryByTestId("user-score-record");

    const userRecordPosition = within(userRecord).getByText(
      `(You) ${userScore.position}`
    );
    expect(userRecordPosition).toBeInTheDocument();
    expect(userRecordPosition).toHaveTextContent(`(You) ${userScore.position}`);

    const userRecordUsername = within(userRecord).getByText(
      `${userScore.user}`
    );
    expect(userRecordUsername).toBeInTheDocument();
    expect(userRecordUsername).toHaveTextContent(`${userScore.user}`);

    const userRecordScore = within(userRecord).getByText(`${userScore.score}`);
    expect(userRecordScore).toBeInTheDocument();
    expect(userRecordScore).toHaveTextContent(`${userScore.score}`);
  });
});
