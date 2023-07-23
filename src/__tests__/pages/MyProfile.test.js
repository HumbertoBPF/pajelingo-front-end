const { screen } = require("@testing-library/react");
const { default: MyProfile } = require("pages/MyProfile");
const { renderWithProviders } = require("test-utils/store");

const mockedUser = {
  token: "token",
  email: "humberto@test.com",
  username: "HumbertoBPF",
  bio: "My bio",
  badges: []
};

it("should render authenticated user data", () => {
  renderWithProviders(<MyProfile />, {
    preloadedState: {
      user: mockedUser
    }
  });

  const usernameData = screen.getByTestId("username-data");
  expect(usernameData).toBeInTheDocument();
  expect(usernameData).toHaveTextContent("HumbertoBPF");

  const emailData = screen.getByTestId("email-data");
  expect(emailData).toBeInTheDocument();
  expect(emailData).toHaveTextContent("humberto@test.com");

  const bioData = screen.getByTestId("bio-data");
  expect(bioData).toBeInTheDocument();
  expect(bioData).toHaveTextContent("My bio");

  const updatePictureButton = screen.getByTestId("update-picture-button");
  expect(updatePictureButton).toBeInTheDocument();
  expect(updatePictureButton).toHaveTextContent("Update picture");
  expect(updatePictureButton).toHaveClass("btn-info");

  const updateButton = screen.getByTestId("update-item");
  expect(updateButton).toBeInTheDocument();
  expect(updateButton).toHaveTextContent("Edit account");

  const deleteButton = screen.getByTestId("delete-item");
  expect(deleteButton).toBeInTheDocument();
  expect(deleteButton).toHaveTextContent("Delete account");

  const favoriteButton = screen.getByTestId("favorite-item");
  expect(favoriteButton).toBeInTheDocument();
  expect(favoriteButton).toHaveTextContent("Favorite words");
});
