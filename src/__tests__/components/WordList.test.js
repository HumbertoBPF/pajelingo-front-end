const { screen, within } = require("@testing-library/react");
const { default: WordList } = require("components/WordList");
import favoriteWords from "../../../cypress/fixtures/words-with-favorite-option.json";
import { renderWithProviders } from "test-utils/store";

const wordsWithoutResults = {
  results: [],
  count: 0,
  page: 1
};

const assertWordCard = (word) => {
  const wordCard = screen.getByTestId(`${word.id}-word-card`);
  expect(wordCard).toBeInTheDocument();

  const wordCardWordName = within(wordCard).getByText(word.word_name);
  expect(wordCardWordName).toHaveTextContent(word.word_name);

  const wordCardFlagImageAlt = within(wordCard).getByAltText(
    `${word.language} language flag`
  );
  expect(wordCardFlagImageAlt).toBeInTheDocument();

  const wordCardHeartFilled =
    within(wordCard).queryByTestId("heart-filled-icon");
  const wordCardHeartNonFilled = within(wordCard).queryByTestId("heart-icon");

  if (word.is_favorite) {
    expect(wordCardHeartFilled).toBeInTheDocument();
    expect(wordCardHeartNonFilled).not.toBeInTheDocument();
  } else {
    expect(wordCardHeartFilled).not.toBeInTheDocument();
    expect(wordCardHeartNonFilled).toBeInTheDocument();
  }
};

it("should display 'no result' image when the words props has count = 0", () => {
  renderWithProviders(<WordList words={wordsWithoutResults} />);

  const noResultImg = screen.getByTestId("no-results-img");
  const spinner = screen.queryByTestId("spinner");
  const currentPage = screen.queryByTestId("current-page");
  const previousPage = screen.queryByTestId("previous-page");
  const nextPage = screen.queryByTestId("next-page");
  const ellipsisStart = screen.queryByTestId("ellipsis-start");
  const ellipsisEnd = screen.queryByTestId("ellipsis-end");
  const lastPage = screen.queryByTestId("12th-page");

  expect(noResultImg).toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
  expect(currentPage).not.toBeInTheDocument();
  expect(previousPage).not.toBeInTheDocument();
  expect(nextPage).not.toBeInTheDocument();
  expect(ellipsisStart).not.toBeInTheDocument();
  expect(ellipsisEnd).not.toBeInTheDocument();
  expect(lastPage).not.toBeInTheDocument();
});

it("should display spinner when the isLoading props is true", () => {
  renderWithProviders(<WordList words={wordsWithoutResults} isLoading />);

  const noResultImg = screen.queryByTestId("no-results-img");
  const spinner = screen.getByTestId("spinner");
  const currentPage = screen.queryByTestId("current-page");
  const previousPage = screen.queryByTestId("previous-page");
  const nextPage = screen.queryByTestId("next-page");
  const ellipsisStart = screen.queryByTestId("ellipsis-start");
  const ellipsisEnd = screen.queryByTestId("ellipsis-end");
  const lastPage = screen.queryByTestId("12th-page");

  expect(noResultImg).not.toBeInTheDocument();
  expect(spinner).toBeInTheDocument();
  expect(currentPage).not.toBeInTheDocument();
  expect(previousPage).not.toBeInTheDocument();
  expect(nextPage).not.toBeInTheDocument();
  expect(ellipsisStart).not.toBeInTheDocument();
  expect(ellipsisEnd).not.toBeInTheDocument();
  expect(lastPage).not.toBeInTheDocument();
});

it("should display results when the words props has a non-empty list of results", () => {
  renderWithProviders(<WordList words={{ ...favoriteWords, page: 1 }} />);

  const noResultImg = screen.queryByTestId("no-results-img");
  const spinner = screen.queryByTestId("spinner");
  const currentPage = screen.queryByTestId("current-page");
  const previousPage = screen.queryByTestId("previous-page");
  const nextPage = screen.queryByTestId("next-page");
  const ellipsisStart = screen.queryByTestId("ellipsis-start");
  const ellipsisEnd = screen.queryByTestId("ellipsis-end");
  const lastPage = screen.queryByTestId("12th-page");

  expect(favoriteWords.results.length).toBe(12);

  favoriteWords.results.forEach((word) => assertWordCard(word));

  expect(noResultImg).not.toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
  expect(currentPage).toHaveTextContent("1(current)");
  expect(previousPage).not.toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
  expect(ellipsisStart).not.toBeInTheDocument();
  expect(ellipsisEnd).toHaveTextContent("…More");
  expect(lastPage).toHaveTextContent("12");
});
