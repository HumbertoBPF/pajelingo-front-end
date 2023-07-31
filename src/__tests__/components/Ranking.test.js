const { screen, within } = require("@testing-library/react");
const { default: Ranking } = require("components/Ranking");
import { faker } from "@faker-js/faker/locale/en_US";
import {
  assertMyPosition,
  assertRankingHeaders,
  assertRankingRecords
} from "test-utils/assertions/ranking";
import { renderWithProviders } from "test-utils/store";

const getRankingRecords = (n) => {
  const records = [];

  for (let i = 0; i < n; i++) {
    records.push({
      user: faker.internet.userName(),
      score: faker.number.int({ min: 100, max: 1000 })
    });
  }

  return records;
};

describe("should display the current page of the ranking", () => {
  it("without the user score", () => {
    const n = faker.number.int({ min: 1, max: 10 });

    const ranking = {
      page: faker.number.int({ min: 1, max: 10 }),
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
    const n = faker.number.int({ min: 1, max: 10 });

    const userScore = {
      position: faker.number.int({ min: 1, max: 10 }),
      user: faker.internet.userName(),
      score: faker.number.int({ min: 100, max: 1000 })
    };

    const ranking = {
      page: faker.number.int({ min: 1, max: 10 }),
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

    assertMyPosition(userScore);
  });
});
