const { screen, within } = require("@testing-library/react");
const { default: Account } = require("components/Account");
const { renderWithProviders } = require("utils/test-utils");
import userEvent from "@testing-library/user-event";
import languages from "../test-data/languages.json";
import newBadges from "../test-data/new-badges.json";
import scores from "../test-data/scores.json";
import { getUserScores } from "api/scores";
import { getRandomInteger } from "utils";

const assertPublicInformation = (userData) => {
  const usernameData = screen.getByTestId("username-data");
  expect(usernameData).toBeInTheDocument();
  expect(usernameData).toHaveTextContent(userData.username);

  const bioData = screen.getByTestId("bio-data");
  expect(bioData).toBeInTheDocument();
  expect(bioData).toHaveTextContent(userData.bio);
};

const assertLateralMenu = () => {
  const updateItem = screen.getByTestId("update-item");
  expect(updateItem).toBeInTheDocument();
  expect(updateItem).toHaveTextContent("Edit account");
  const updateItemIcon = within(updateItem).getByTestId("pencil-icon");
  expect(updateItemIcon).toBeInTheDocument();

  const deleteItem = screen.getByTestId("delete-item");
  expect(deleteItem).toBeInTheDocument();
  expect(deleteItem).toHaveTextContent("Delete account");
  const deleteItemIcon = within(deleteItem).getByTestId("trashcan-icon");
  expect(deleteItemIcon).toBeInTheDocument();

  const favoriteItem = screen.getByTestId("favorite-item");
  expect(favoriteItem).toBeInTheDocument();
  expect(favoriteItem).toHaveTextContent("Favorite words");
  const favoriteItemIcon =
    within(favoriteItem).getByTestId("heart-filled-icon");
  expect(favoriteItemIcon).toBeInTheDocument();
};

const assertBadgeListSection = () => {
  const badgeSectionTitle = screen.getByTestId("badges-section-title");
  expect(badgeSectionTitle).toBeInTheDocument();
  expect(badgeSectionTitle).toHaveTextContent("Badges:");

  const badgeIcon = within(badgeSectionTitle).getByTestId("badge-icon");
  expect(badgeIcon).toBeInTheDocument();

  const badgeList = screen.getByTestId("user-badges");

  newBadges.badges.forEach((badge) => {
    const badgeElement = within(badgeList).getByTestId(`badge-${badge.id}`);

    const badgeName = within(badgeElement).getByText(badge.name);
    expect(badgeName).toBeInTheDocument();

    const badgeIcon = within(badgeElement).getByAltText(badge.name);
    expect(badgeIcon).toBeInTheDocument();
  });
};

const assertScoreHeaders = () => {
  const userScoresHeaders = screen.getByTestId("user-scores-headers");

  const gameHeader = within(userScoresHeaders).getByText("Game");
  expect(gameHeader).toBeInTheDocument();
  expect(gameHeader).toHaveTextContent("Game");

  const scoreHeader = within(userScoresHeaders).getByText("Score");
  expect(scoreHeader).toBeInTheDocument();
  expect(scoreHeader).toHaveTextContent("Score");
};

const assertUserScoresSection = () => {
  const scoresSectionTitle = screen.getByTestId("score-section-title");
  expect(scoresSectionTitle).toBeInTheDocument();
  expect(scoresSectionTitle).toHaveTextContent("Performance in our games:");

  const tropheeIcon = within(scoresSectionTitle).getByTestId("trophee-icon");
  expect(tropheeIcon).toBeInTheDocument();

  const languageSelect = screen.getByTestId("select-language");
  expect(languageSelect).toBeInTheDocument();

  assertScoreHeaders();
};

const assertUserScores = (scores) => {
  assertScoreHeaders();

  scores.forEach((score, index) => {
    const scoreItem = screen.getByTestId(`${index + 1}th-ranking-record`);

    const scoreGame = within(scoreItem).getByText(score.game);
    expect(scoreGame).toBeInTheDocument();
    expect(scoreGame).toHaveTextContent(score.game);

    const scoreValue = within(scoreItem).getByText(score.score);
    expect(scoreValue).toBeInTheDocument();
    expect(scoreValue).toHaveTextContent(score.score);
  });
};

const getUnauthenticatedUser = (picture) => {
  const user = {
    username: "HumbertoBPF",
    bio: "My bio",
    badges: newBadges.badges
  };

  if (picture) {
    user.picture = picture;
  }

  return user;
};

const getAuthenticatedUser = (picture) => {
  const user = getUnauthenticatedUser(picture);

  user.token = "token";
  user.email = "humberto@test.com";

  return user;
};

jest.mock("api/scores", () => {
  return {
    getUserScores: jest.fn()
  };
});

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

describe("should display account information", () => {
  describe("of non-authenticated user", () => {
    it("without profile picture", () => {
      const userData = getUnauthenticatedUser();

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.queryByTestId("email-data");
      expect(emailData).not.toBeInTheDocument();

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).not.toBeInTheDocument();

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).toBeInTheDocument();
      expect(defaultPicture).toHaveAccessibleName("User profile");

      assertBadgeListSection();

      assertUserScoresSection();
    });

    it("with profile picture", () => {
      const userData = getUnauthenticatedUser("picture");

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.queryByTestId("email-data");
      expect(emailData).not.toBeInTheDocument();

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).toBeInTheDocument();
      expect(profilePicture).toHaveAccessibleName("User profile");

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).not.toBeInTheDocument();

      assertBadgeListSection();

      assertUserScoresSection();
    });
  });

  describe("of authenticated user", () => {
    it("without profile picture", () => {
      const userData = getAuthenticatedUser();

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).not.toBeInTheDocument();

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).toBeInTheDocument();
      expect(defaultPicture).toHaveAccessibleName("User profile");

      assertLateralMenu();

      assertBadgeListSection();

      assertUserScoresSection();
    });

    it("with profile picture", () => {
      const userData = getAuthenticatedUser("picture");

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).toBeInTheDocument();
      expect(profilePicture).toHaveAccessibleName("User profile");

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).not.toBeInTheDocument();

      assertLateralMenu();

      assertBadgeListSection();

      assertUserScoresSection();
    });
  });
});

it("should call the API when a language is selected", async () => {
  getUserScores.mockImplementation((language, username, onSuccess) => {
    if (language === languages[0].language_name) {
      onSuccess(scores.default);
      return;
    }

    onSuccess(scores.others);
  });

  const user = userEvent.setup();

  const userData = getUnauthenticatedUser("picture");

  renderWithProviders(<Account user={userData} />, {
    preloadedState: {
      languages
    }
  });
  // Fisrt call to firstly populate the user scores
  expect(getUserScores).toHaveBeenCalledTimes(1);
  expect(getUserScores).toHaveBeenCalledWith(
    languages[0].language_name,
    userData.username,
    expect.anything()
  );

  assertUserScores(scores.default);

  const selectLanguage = screen.getByTestId("select-language");

  await user.click(selectLanguage);

  expect(getUserScores).toHaveBeenCalledTimes(2);
  expect(getUserScores).toHaveBeenCalledWith(
    languages[0].language_name,
    userData.username,
    expect.anything()
  );

  assertUserScores(scores.default);

  const randomLanguage = languages[getRandomInteger(1, 4)];

  const randomLanguageItem = within(selectLanguage).getByText(
    randomLanguage.language_name
  );

  await user.click(randomLanguageItem);

  expect(getUserScores).toHaveBeenCalledTimes(3);
  expect(getUserScores).toHaveBeenCalledWith(
    randomLanguage.language_name,
    userData.username,
    expect.anything()
  );

  assertUserScores(scores.others);
});
