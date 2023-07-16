const { screen, within } = require("@testing-library/react");
const { default: WordList } = require("components/WordList");
import wordsPage from "../test-data/words-page.json";
import { renderWithProviders } from "utils/test-utils";

const wordsWithoutResults = {
  results: [],
  count: 0,
  page: 1
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
  renderWithProviders(<WordList words={{ ...wordsPage, page: 1 }} />);

  const noResultImg = screen.queryByTestId("no-results-img");
  const spinner = screen.queryByTestId("spinner");
  const currentPage = screen.queryByTestId("current-page");
  const previousPage = screen.queryByTestId("previous-page");
  const nextPage = screen.queryByTestId("next-page");
  const ellipsisStart = screen.queryByTestId("ellipsis-start");
  const ellipsisEnd = screen.queryByTestId("ellipsis-end");
  const lastPage = screen.queryByTestId("12th-page");

  expect(wordsPage.results.length).toBe(12);

  wordsPage.results.forEach((word) => {
    const wordCard = screen.getByTestId(`${word.id}-word-card`);
    const wordCardWordName = within(wordCard).getByText(word.word_name);
    const wordCardFlagImageAlt = within(wordCard).getByAltText(
      `${word.language} language flag`
    );
    const wordCardHeartFilled =
      within(wordCard).queryByTestId("heart-icon-filled");
    const wordCardHeartNonFilled = within(wordCard).queryByTestId(
      "heart-icon-non-filled"
    );

    expect(wordCard).toBeInTheDocument();
    expect(wordCardWordName).toHaveTextContent(word.word_name);
    expect(wordCardFlagImageAlt).toBeInTheDocument();

    if (word.is_favorite) {
      expect(wordCardHeartFilled).toBeInTheDocument();
      expect(wordCardHeartNonFilled).not.toBeInTheDocument();
    } else {
      expect(wordCardHeartFilled).not.toBeInTheDocument();
      expect(wordCardHeartNonFilled).toBeInTheDocument();
    }
  });

  expect(noResultImg).not.toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
  expect(currentPage).toHaveTextContent("1(current)");
  expect(previousPage).not.toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
  expect(ellipsisStart).not.toBeInTheDocument();
  expect(ellipsisEnd).toHaveTextContent("…More");
  expect(lastPage).toHaveTextContent("12");
});
