import { screen, within } from "@testing-library/react";

export const assertUpdatePictureButton = () => {
  const updatePictureButton = screen.getByTestId("update-picture-button");
  expect(updatePictureButton).toBeInTheDocument();
  expect(updatePictureButton).toHaveTextContent("Update picture");
  expect(updatePictureButton).toHaveClass("btn-info");
  const updatePictureIcon =
    within(updatePictureButton).getByTestId("user-picture-icon");
  expect(updatePictureIcon).toBeInTheDocument();
};

export const assertDefaultPicture = () => {
  const profilePicture = screen.queryByTestId("profile-picture");
  expect(profilePicture).not.toBeInTheDocument();

  const defaultPicture = screen.queryByTestId("default-picture");
  expect(defaultPicture).toBeInTheDocument();
  expect(defaultPicture).toHaveAccessibleName("User profile");
};

export const assertProfilePicture = () => {
  const profilePicture = screen.queryByTestId("profile-picture");
  expect(profilePicture).toBeInTheDocument();
  expect(profilePicture).toHaveAccessibleName("User profile");

  const defaultPicture = screen.queryByTestId("default-picture");
  expect(defaultPicture).not.toBeInTheDocument();
};

export const assertPublicInformation = (userData) => {
  const usernameData = screen.getByTestId("username-data");
  expect(usernameData).toBeInTheDocument();
  expect(usernameData).toHaveTextContent(userData.username);

  const bioData = screen.getByTestId("bio-data");
  expect(bioData).toBeInTheDocument();
  expect(bioData).toHaveTextContent(userData.bio);
};

export const assertLateralMenu = () => {
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

export const assertBadgeListSection = (badges) => {
  const badgeSectionTitle = screen.getByTestId("badges-section-title");
  expect(badgeSectionTitle).toBeInTheDocument();
  expect(badgeSectionTitle).toHaveTextContent("Badges:");

  const badgeIcon = within(badgeSectionTitle).getByTestId("badge-icon");
  expect(badgeIcon).toBeInTheDocument();

  const badgeList = screen.getByTestId("user-badges");

  badges.forEach((badge) => {
    const badgeElement = within(badgeList).getByTestId(`badge-${badge.id}`);

    const badgeName = within(badgeElement).getByText(badge.name);
    expect(badgeName).toBeInTheDocument();

    const badgeIcon = within(badgeElement).getByAltText(badge.name);
    expect(badgeIcon).toBeInTheDocument();
  });
};

export const assertScoreHeaders = () => {
  const userScoresHeaders = screen.getByTestId("user-scores-headers");

  const gameHeader = within(userScoresHeaders).getByText("Game");
  expect(gameHeader).toBeInTheDocument();
  expect(gameHeader).toHaveTextContent("Game");

  const scoreHeader = within(userScoresHeaders).getByText("Score");
  expect(scoreHeader).toBeInTheDocument();
  expect(scoreHeader).toHaveTextContent("Score");
};

export const assertUserScoresSection = () => {
  const scoresSectionTitle = screen.getByTestId("score-section-title");
  expect(scoresSectionTitle).toBeInTheDocument();
  expect(scoresSectionTitle).toHaveTextContent("Performance in our games:");

  const tropheeIcon = within(scoresSectionTitle).getByTestId("trophee-icon");
  expect(tropheeIcon).toBeInTheDocument();

  const languageSelect = screen.getByTestId("select-language");
  expect(languageSelect).toBeInTheDocument();

  assertScoreHeaders();
};

export const assertUserScores = (scores) => {
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

export const assertErrorToast = (errorMessage) => {
  const errorToast = screen.getByTestId("error-toast");
  expect(errorToast).toBeInTheDocument();

  const errorToastTitle = within(errorToast).getByText("Error");
  expect(errorToastTitle).toBeInTheDocument();

  const errorToastMessage = within(errorToast).getByText(errorMessage);
  expect(errorToastMessage).toBeInTheDocument();
};
