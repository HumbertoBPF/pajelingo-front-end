const {
  screen,
  within,
  waitForElementToBeRemoved
} = require("@testing-library/react");
const { getLanguages } = require("api/languages");
const { searchFavoriteWords } = require("api/words");
const { default: FavoriteWords } = require("pages/FavoriteWords");
const { assertFirstPageOf } = require("test-utils/assertions/pagination");
const {
  assertWordCardWithFavoriteOption
} = require("test-utils/assertions/word-cards");
const { languages } = require("test-utils/mocking/languages");
const { getAuthenticatedUser } = require("test-utils/mocking/users");
const { favoriteWords } = require("test-utils/mocking/words");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/languages", () => {
  return {
    getLanguages: jest.fn()
  };
});

jest.mock("api/words", () => {
  return {
    searchFavoriteWords: jest.fn()
  };
});

it("should render favorite words of the authenticated user", async () => {
  const user = getAuthenticatedUser();

  getLanguages.mockImplementation(() => {
    return languages;
  });

  searchFavoriteWords.mockImplementation((queryParams, token, onSuccess) => {
    onSuccess(favoriteWords);
  });

  renderWithProviders(<FavoriteWords />, {
    preloadedState: {
      languages,
      user
    }
  });

  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Favorite words");

  const eyeglassIcon = within(title).getByTestId("heart-filled-icon");
  expect(eyeglassIcon).toBeInTheDocument();

  expect(searchFavoriteWords).toHaveBeenCalledTimes(1);
  expect(searchFavoriteWords).toHaveBeenCalledWith(
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
    expect.anything(),
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

it("should render error toast when the API returns an error", async () => {
  const user = getAuthenticatedUser();

  getLanguages.mockImplementation(() => {
    return languages;
  });

  searchFavoriteWords.mockImplementation(
    (queryParams, token, onSuccess, onFail) => {
      onFail();
    }
  );

  renderWithProviders(<FavoriteWords />, {
    preloadedState: {
      languages,
      user
    }
  });

  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Favorite words");

  const eyeglassIcon = within(title).getByTestId("heart-filled-icon");
  expect(eyeglassIcon).toBeInTheDocument();

  expect(searchFavoriteWords).toHaveBeenCalledTimes(1);
  expect(searchFavoriteWords).toHaveBeenCalledWith(
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
    expect.anything(),
    expect.anything()
  );

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();

  const errorToast = screen.getByTestId("error-toast");
  expect(errorToast).toBeInTheDocument();

  const errorToastTitle = within(errorToast).getByText("Error");
  expect(errorToastTitle).toBeInTheDocument();
  expect(errorToastTitle).toHaveTextContent("Error");

  const errorToastMessage = within(errorToast).getByText(
    "An error occurred when processing the request. Please try again."
  );
  expect(errorToastMessage).toBeInTheDocument();
  expect(errorToastMessage).toHaveTextContent(
    "An error occurred when processing the request. Please try again."
  );
});
