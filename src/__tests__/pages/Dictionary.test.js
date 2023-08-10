const {
  screen,
  within,
  waitForElementToBeRemoved
} = require("@testing-library/react");
const { getLanguages } = require("api/languages");
const { searchWords } = require("api/words");
const { default: Dictionary } = require("pages/Dictionary");
const { assertFirstPageOf } = require("test-utils/assertions/pagination");
const {
  assertWordCardWithoutFavoriteOption,
  assertWordCardWithFavoriteOption
} = require("test-utils/assertions/word-cards");
import languages from "../../../cypress/fixtures/languages.json";
const { getAuthenticatedUser } = require("test-utils/mocking/users");
import words from "../../../cypress/fixtures/words.json";
import favoriteWords from "../../../cypress/fixtures/words-with-favorite-option.json";
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/languages", () => {
  return {
    getLanguages: jest.fn()
  };
});

jest.mock("api/words", () => {
  return {
    searchWords: jest.fn()
  };
});

it("should render words without favorite option", async () => {
  getLanguages.mockImplementation(() => {
    return languages;
  });

  searchWords.mockImplementation((queryParams, token, onSuccess) => {
    onSuccess(words);
  });

  renderWithProviders(<Dictionary />, {
    preloadedState: {
      languages
    }
  });

  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Dictionary");

  const eyeglassIcon = within(title).getByTestId("eyeglass-icon");
  expect(eyeglassIcon).toBeInTheDocument();

  expect(searchWords).toHaveBeenCalledTimes(1);
  expect(searchWords).toHaveBeenCalledWith(
    {
      page: 1,
      Portuguese: true,
      English: true,
      German: true,
      French: true,
      Spanish: true,
      search: ""
    },
    null,
    expect.anything()
  );

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
    timeout: 5000
  });

  words.results.forEach((word) => {
    assertWordCardWithoutFavoriteOption(word);
  });

  assertFirstPageOf(12);
});

it("should render words with favorite option", async () => {
  const user = getAuthenticatedUser();

  getLanguages.mockImplementation(() => {
    return languages;
  });

  searchWords.mockImplementation((queryParams, token, onSuccess) => {
    onSuccess(favoriteWords);
  });

  renderWithProviders(<Dictionary />, {
    preloadedState: {
      user,
      languages
    }
  });

  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Dictionary");

  const eyeglassIcon = within(title).getByTestId("eyeglass-icon");
  expect(eyeglassIcon).toBeInTheDocument();

  expect(searchWords).toHaveBeenCalledTimes(1);
  expect(searchWords).toHaveBeenCalledWith(
    {
      page: 1,
      Portuguese: true,
      English: true,
      German: true,
      French: true,
      Spanish: true,
      search: ""
    },
    user.token,
    expect.anything()
  );

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
    timeout: 5000
  });

  favoriteWords.results.forEach((word) => {
    assertWordCardWithFavoriteOption(word);
  });

  assertFirstPageOf(12);
});
