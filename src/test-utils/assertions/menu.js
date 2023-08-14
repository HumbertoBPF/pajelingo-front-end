const { within, screen } = require("@testing-library/dom");

export const assertMenuItems = () => {
  const logo = screen.getByTestId("brand-logo");
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute("href", "/dashboard");

  const logoImage = within(logo).getByTestId("logo-img");
  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveAccessibleName("Pajelingo logo");

  const searchDropdown = screen.getByTestId("search-dropdown");
  expect(searchDropdown).toBeInTheDocument();
  expect(searchDropdown).toHaveTextContent("Search");

  const gamesDropdown = screen.getByTestId("games-dropdown");
  expect(gamesDropdown).toBeInTheDocument();
  expect(gamesDropdown).toHaveTextContent("Games");

  const aboutUsLink = screen.getByTestId("about-us-link");
  expect(gamesDropdown).toBeInTheDocument();
  expect(aboutUsLink).toHaveTextContent("About us");
};

export const assertMenuSearchDropdown = () => {
  const searchDropdown = screen.getByTestId("search-dropdown");

  const dictionaryItem = within(searchDropdown).getByTestId("dictionary-item");
  expect(dictionaryItem).toBeInTheDocument();
  expect(dictionaryItem).toHaveTextContent("Dictionary");

  const accountItem = within(searchDropdown).getByTestId("account-item");
  expect(accountItem).toBeInTheDocument();
  expect(accountItem).toHaveTextContent("Account");
};

export const assertMenuGamesDropdown = () => {
  const gamesDropdown = screen.getByTestId("games-dropdown");

  const playItem = within(gamesDropdown).getByTestId("play-item");
  expect(playItem).toBeInTheDocument();
  expect(playItem).toHaveTextContent("Play");

  const rankingsItem = within(gamesDropdown).getByTestId("rankings-item");
  expect(rankingsItem).toBeInTheDocument();
  expect(rankingsItem).toHaveTextContent("Rankings");
};
