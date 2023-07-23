const { screen, within } = require("@testing-library/react");
const { default: Account } = require("components/Account");
const { renderWithProviders } = require("test-utils/store");
import userEvent from "@testing-library/user-event";
import languages from "../test-data/languages.json";
import newBadges from "../test-data/new-badges.json";
import scores from "../test-data/scores.json";
import { getUserScores } from "api/scores";
import { getRandomInteger } from "utils";
import {
  assertBadgeListSection,
  assertDefaultPicture,
  assertLateralMenu,
  assertProfilePicture,
  assertPublicInformation,
  assertUpdatePictureButton,
  assertUserScores,
  assertUserScoresSection
} from "test-utils/custom-assertions/profile";

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

      assertDefaultPicture();
      assertBadgeListSection(newBadges.badges);
      assertUserScoresSection();
    });

    it("with profile picture", () => {
      const userData = getUnauthenticatedUser("picture");

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.queryByTestId("email-data");
      expect(emailData).not.toBeInTheDocument();

      assertProfilePicture();
      assertBadgeListSection(newBadges.badges);
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

      assertDefaultPicture();
      assertUpdatePictureButton();
      assertLateralMenu();
      assertBadgeListSection(newBadges.badges);
      assertUserScoresSection();
    });

    it("with profile picture", () => {
      const userData = getAuthenticatedUser("picture");

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      assertProfilePicture();
      assertUpdatePictureButton();
      assertLateralMenu();
      assertBadgeListSection(newBadges.badges);
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
