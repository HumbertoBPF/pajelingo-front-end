const { screen, within } = require("@testing-library/dom");
const { default: userEvent } = require("@testing-library/user-event");
const { getGames } = require("api/games");
const { default: Menu } = require("components/Menu");
import { getUser } from "api/user";
import games from "../../../cypress/fixtures/games.json";
import {
  assertAuthenticatedAccountMenu,
  assertUnauthenticatedAccountMenu
} from "test-utils/assertions/account-menu";
import { getAuthenticatedUser } from "test-utils/mocking/users";
const {
  assertMenuItems,
  assertMenuSearchDropdown,
  assertMenuGamesDropdown
} = require("test-utils/assertions/menu");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    getUser: jest.fn()
  };
});

jest.mock("api/games", () => {
  return {
    getGames: jest.fn()
  };
});

beforeEach(() => {
  getGames.mockImplementation(() => {
    return games;
  });
});

it("should render menu for unauthenticated user", async () => {
  const user = userEvent.setup();

  getUser.mockImplementation(() => {
    return null;
  });

  renderWithProviders(<Menu />);

  assertMenuItems();

  const searchDropdown = screen.getByTestId("search-dropdown");
  await user.click(within(searchDropdown).getByText("Search"));
  assertMenuSearchDropdown();

  const gamesDropdown = screen.getByTestId("games-dropdown");
  await user.click(within(gamesDropdown).getByText("Games"));
  assertMenuGamesDropdown();

  assertUnauthenticatedAccountMenu();

  expect(getUser).toHaveBeenCalledTimes(1);
  expect(getGames).toHaveBeenCalledTimes(1);
});

it("should render menu for authenticated user", async () => {
  const user = userEvent.setup();
  const mockedUser = getAuthenticatedUser();

  getUser.mockImplementation(() => {
    return mockedUser;
  });

  renderWithProviders(<Menu />);

  assertMenuItems();

  const searchDropdown = screen.getByTestId("search-dropdown");
  await user.click(within(searchDropdown).getByText("Search"));
  assertMenuSearchDropdown();

  const gamesDropdown = screen.getByTestId("games-dropdown");
  await user.click(within(gamesDropdown).getByText("Games"));
  assertMenuGamesDropdown();

  const dropdownToggle = screen.getByTestId("profile-dropdown");

  expect(dropdownToggle).toHaveTextContent(mockedUser.username);
  await user.click(dropdownToggle);

  assertAuthenticatedAccountMenu();

  expect(getUser).toHaveBeenCalledTimes(1);
  expect(getGames).toHaveBeenCalledTimes(1);
});
