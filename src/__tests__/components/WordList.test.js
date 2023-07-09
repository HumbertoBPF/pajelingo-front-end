const { render, screen, within } = require("@testing-library/react");
const { default: WordList } = require("components/WordList");
const { Provider } = require("react-redux");
const { default: store } = require("store");
import { MemoryRouter } from "react-router-dom";
import wordsPage from "../test-data/words-page.json";

it("should display 'no result' image when the words props has count = 0", () => {
  const words = {
    results: [],
    count: 0,
    page: 1
  };

  render(
    <Provider store={store}>
      <WordList words={words} />
    </Provider>
  );

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
  const words = {
    results: [],
    count: 0,
    page: 1
  };

  render(
    <Provider store={store}>
      <WordList words={words} isLoading />
    </Provider>
  );

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
  render(
    <Provider store={store}>
      <MemoryRouter>
        <WordList words={{ ...wordsPage, page: 1 }} />
      </MemoryRouter>
    </Provider>
  );

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
    expect(wordCardWordName.textContent).toBe(word.word_name);
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
  expect(currentPage.textContent).toBe("1(current)");
  expect(previousPage).not.toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
  expect(ellipsisStart).not.toBeInTheDocument();
  expect(ellipsisEnd.textContent).toBe("…More");
  expect(lastPage.textContent).toBe("12");
});
