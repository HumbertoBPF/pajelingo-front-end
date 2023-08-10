const { faker } = require("@faker-js/faker/locale/en_US");
const {
  screen,
  within,
  waitForElementToBeRemoved
} = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { searchAccount } = require("api/user");
const { default: SearchAccount } = require("pages/SearchAccount");
const { assertFirstPageOf } = require("test-utils/assertions/pagination");
import accounts from "../../../cypress/fixtures/accounts.json";
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    searchAccount: jest.fn()
  };
});

it("should render search form", () => {
  renderWithProviders(<SearchAccount />);

  const searchLabeledInput = screen.getByTestId("search-input");
  expect(searchLabeledInput).toBeInTheDocument();

  const searchInput =
    within(searchLabeledInput).getByPlaceholderText("Search an account");
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveAttribute("type", "text");

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent("Search account");
  expect(submitButton).toHaveClass("btn-success");
});

it("should submit form and render search results", async () => {
  searchAccount.mockImplementation((queryParams, onSuccess) => {
    onSuccess(accounts);
  });

  const user = userEvent.setup();

  const searchPattern = faker.word.words();

  renderWithProviders(<SearchAccount />);

  const searchLabeledInput = screen.getByTestId("search-input");
  const searchInput =
    within(searchLabeledInput).getByPlaceholderText("Search an account");

  await user.type(searchInput, searchPattern);

  const submitButton = screen.getByTestId("submit-button");

  await user.click(submitButton);

  expect(searchAccount).toHaveBeenCalledTimes(1);
  expect(searchAccount).toHaveBeenCalledWith(
    { q: searchPattern, page: 1 },
    expect.anything()
  );

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByTestId("spinner"), {
    timeout: 5000
  });

  accounts.results.forEach((account) => {
    const accountCard = screen.getByTestId(`${account.username}-card`);
    expect(accountCard).toBeInTheDocument();

    const accountCardUsername = within(accountCard).getByText(account.username);
    expect(accountCard).toBeInTheDocument();
    expect(accountCardUsername).toHaveTextContent(account.username);

    const accountCardPicture = within(accountCard).getByAltText(
      account.username
    );
    expect(accountCardPicture).toBeInTheDocument();
  });

  assertFirstPageOf(8);
});
