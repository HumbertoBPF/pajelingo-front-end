const { screen } = require("@testing-library/react");
const { default: MyProfile } = require("pages/MyProfile");
const { renderWithProviders } = require("test-utils/store");
import { getUser } from "api/user";
import {
  assertBadgeListSection,
  assertLateralMenu,
  assertProfilePicture,
  assertPublicInformation,
  assertUserScoresSection
} from "test-utils/assertions/profile";
import { getAuthenticatedUser } from "test-utils/mocking/users";

const mockedUser = getAuthenticatedUser("picture");

jest.mock("api/user", () => {
  return {
    getUser: jest.fn()
  };
});

it("should render authenticated user data", () => {
  getUser.mockImplementation(() => {
    return mockedUser;
  });

  renderWithProviders(<MyProfile />, {
    preloadedState: {
      user: mockedUser
    }
  });

  const emailData = screen.getByTestId("email-data");
  expect(emailData).toBeInTheDocument();
  expect(emailData).toHaveTextContent(mockedUser.email);

  assertPublicInformation(mockedUser);
  assertProfilePicture();
  assertLateralMenu();
  assertBadgeListSection(mockedUser.badges);
  assertUserScoresSection();

  expect(getUser).toHaveBeenCalledTimes(1);
});
