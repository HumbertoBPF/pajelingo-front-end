import { screen, within } from "@testing-library/react";
import { assertIsNthPage } from "./pagination";

export const assertRankingHeaders = () => {
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

export const assertRankingRecords = (page, results) => {
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

export const assertMyPosition = (userScore) => {
  const userRecord = screen.getByTestId("user-score-record");

  const userRecordPosition = within(userRecord).getByText(
    `(You) ${userScore.position}`
  );
  expect(userRecordPosition).toBeInTheDocument();
  expect(userRecordPosition).toHaveTextContent(`(You) ${userScore.position}`);

  const userRecordUsername = within(userRecord).getByText(`${userScore.user}`);
  expect(userRecordUsername).toBeInTheDocument();
  expect(userRecordUsername).toHaveTextContent(`${userScore.user}`);

  const userRecordScore = within(userRecord).getByText(`${userScore.score}`);
  expect(userRecordScore).toBeInTheDocument();
  expect(userRecordScore).toHaveTextContent(`${userScore.score}`);
};

export const assertFirstPageRankingPagination = () => {
  assertIsNthPage(1);

  const lastPage = screen.getByTestId("5th-page");
  expect(lastPage).toBeInTheDocument();
  expect(lastPage).toHaveTextContent("5");

  const previousPage = screen.queryByTestId("previous-page");
  expect(previousPage).not.toBeInTheDocument();

  const nextPage = screen.getByTestId("next-page");
  expect(nextPage).toBeInTheDocument();

  const ellipsisStart = screen.queryByTestId("ellipsis-start");
  expect(ellipsisStart).not.toBeInTheDocument();

  const ellipsisEnd = screen.getByTestId("ellipsis-end");
  expect(ellipsisEnd).toBeInTheDocument();
  expect(ellipsisEnd).toHaveTextContent("…More");
};
