const { screen, within } = require("@testing-library/react");
const { default: Account } = require("components/Account");
const { renderWithProviders } = require("utils/test-utils");
import userEvent from "@testing-library/user-event";
import newBadges from "../test-data/new-badges.json";

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

const assertBadgeList = async (user) => {
  const scoresSectionTitle = screen.getByTestId("score-section-title");
  expect(scoresSectionTitle).toBeInTheDocument();
  expect(scoresSectionTitle).toHaveTextContent("Performance in our games:");

  const tropheeIcon = within(scoresSectionTitle).getByTestId("trophee-icon");
  expect(tropheeIcon).toBeInTheDocument();

  const badgeList = screen.getByTestId("user-badges");

  await newBadges.badges.forEach(async (badge) => {
    const badgeElement = within(badgeList).getByTestId(`badge-${badge.id}`);

    const badgeName = within(badgeElement).getByText(badge.name);
    expect(badgeName).toBeInTheDocument();

    const badgeIcon = within(badgeElement).getByAltText(badge.name);
    expect(badgeIcon).toBeInTheDocument();

    await user.hover(badgeName);

    const popover = screen.getByTestId(`popover-${badge.id}`);

    const badgePopoverHeader = within(popover).getByText(badge.name);
    expect(badgePopoverHeader).toBeInTheDocument();

    const badgePopoverBody = within(popover).getByText(badge.description);
    expect(badgePopoverBody).toBeInTheDocument();
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

describe("should display account information", () => {
  describe("of non-authenticated user", () => {
    it("without profile picture", async () => {
      const user = userEvent.setup();

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

      await assertBadgeList(user);
    });

    it("with profile picture", async () => {
      const user = userEvent.setup();

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

      await assertBadgeList(user);
    });
  });

  describe("of authenticated user", () => {
    it("without profile picture", async () => {
      const user = userEvent.setup();

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

      await assertBadgeList(user);
    });

    it("with profile picture", async () => {
      const user = userEvent.setup();

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

      await assertBadgeList(user);
    });
  });
});
