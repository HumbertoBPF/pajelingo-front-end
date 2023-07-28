const { screen } = require("@testing-library/react");
const { getAccount } = require("api/user");
const { default: Profile } = require("pages/Profile");
const {
  assertPublicInformation,
  assertProfilePicture,
  assertBadgeListSection,
  assertUserScoresSection
} = require("test-utils/custom-assertions/profile");
const { getUnauthenticatedUser } = require("test-utils/mocking/users");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    getAccount: jest.fn()
  };
});

const mockedUser = getUnauthenticatedUser("picture");

it("should render unauthenticated user data", async () => {
  getAccount.mockImplementation((username, onSuccess) => {
    onSuccess(mockedUser);
  });

  renderWithProviders(<Profile />);

  const emailData = screen.queryByTestId("email-data");
  expect(emailData).not.toBeInTheDocument();

  assertPublicInformation(mockedUser);
  assertProfilePicture();

  const updateItem = screen.queryByTestId("update-item");
  expect(updateItem).not.toBeInTheDocument();

  const deleteItem = screen.queryByTestId("delete-item");
  expect(deleteItem).not.toBeInTheDocument();

  const favoriteItem = screen.queryByTestId("favorite-item");
  expect(favoriteItem).not.toBeInTheDocument();

  assertBadgeListSection(mockedUser.badges);
  assertUserScoresSection();
});
