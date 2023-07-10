const { configureStore } = require("@reduxjs/toolkit");
const { render, screen, within } = require("@testing-library/react");
const {
  default: WordListWithFilters
} = require("components/WordListWithFilters");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { default: gamesSliceReducers } = require("store/reducers/games");
const { default: languagesSliceReducers } = require("store/reducers/languages");
const { default: tokenSliceReducer } = require("store/reducers/user");
import wordsPage from "../test-data/words-page.json";
import languages from "../test-data/languages.json";
import userEvent from "@testing-library/user-event";

it("should display model when the filter button is clicked", async () => {
  const user = userEvent.setup();

  const customStore = configureStore({
    reducer: {
      languages: languagesSliceReducers,
      user: tokenSliceReducer,
      games: gamesSliceReducers
    },
    preloadedState: {
      languages
    }
  });

  const paginationCallback = jest.fn(() => {});
  const filterCallback = jest.fn(() => {});

  render(
    <Provider store={customStore}>
      <MemoryRouter>
        <WordListWithFilters
          words={{ ...wordsPage, page: 1 }}
          paginationCallback={paginationCallback}
          filterCallback={filterCallback}
        />
      </MemoryRouter>
    </Provider>
  );

  const filterButton = screen.getByTestId("filter-button");
  await user.click(filterButton);

  const filterModal = screen.getByTestId("filter-modal");

  const labeledInput = within(filterModal).getByTestId("search-input");
  expect(labeledInput).toBeInTheDocument();

  languages.forEach((language) => {
    const checkItem = within(filterModal).getByTestId(
      `${language.language_name}-check-item`
    );
    expect(checkItem).toBeInTheDocument();
    expect(checkItem.value).toBe(language.language_name);
    expect(checkItem.checked).toBe(true);
  });

  const cancelButton = within(filterModal).getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton.textContent).toBe("Cancel");

  const applyFiltersButton = within(filterModal).getByTestId(
    "apply-filters-button"
  );
  expect(applyFiltersButton).toBeInTheDocument();
  expect(applyFiltersButton.textContent).toBe("Apply");
});

it("should call filter callback when clicking on the apply filter button", async () => {
  const user = userEvent.setup();

  const selectedLanguages = new Map([
    ["English", true],
    ["Portuguese", true],
    ["Spanish", true]
  ]);

  const customStore = configureStore({
    reducer: {
      languages: languagesSliceReducers,
      user: tokenSliceReducer,
      games: gamesSliceReducers
    },
    preloadedState: {
      languages
    }
  });

  const paginationCallback = jest.fn(() => {});
  const filterCallback = jest.fn(() => {});

  render(
    <Provider store={customStore}>
      <MemoryRouter>
        <WordListWithFilters
          words={{ ...wordsPage, page: 1 }}
          paginationCallback={paginationCallback}
          filterCallback={filterCallback}
        />
      </MemoryRouter>
    </Provider>
  );

  const filterButton = screen.getByTestId("filter-button");
  await user.click(filterButton);

  const filterModal = screen.getByTestId("filter-modal");

  const labeledInput = within(filterModal).getByTestId("search-input");
  const searchInput =
    within(labeledInput).getByPlaceholderText("Search for...");
  await user.type(searchInput, "query");

  languages.forEach(async (language) => {
    const languageName = language.language_name;

    if (!selectedLanguages.has(languageName)) {
      const checkItem = within(filterModal).getByTestId(
        `${languageName}-check-item`
      );
      await user.click(checkItem);
    }
  });

  const applyFiltersButton = within(filterModal).getByTestId(
    "apply-filters-button"
  );
  await user.click(applyFiltersButton);

  expect(filterCallback).toBeCalledTimes(1);
  expect(filterCallback).toBeCalledWith("query", selectedLanguages);
});
