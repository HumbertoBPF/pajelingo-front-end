const { screen } = require("@testing-library/react");
const { default: Account } = require("components/Account");
const { renderWithProviders } = require("utils/test-utils");

describe("should display account information", () => {
  describe("of non-authenticated user", () => {
    it("without profile picture", () => {
      const userData = {
        username: "HumbertoBPF",
        bio: "My bio"
      };

      renderWithProviders(<Account user={userData} />);

      const usernameData = screen.getByTestId("username-data");
      expect(usernameData).toBeInTheDocument();
      expect(usernameData).toHaveTextContent(userData.username);

      const bioData = screen.getByTestId("bio-data");
      expect(bioData).toBeInTheDocument();
      expect(bioData).toHaveTextContent(userData.bio);

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).not.toBeInTheDocument();

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).toBeInTheDocument();
      expect(defaultPicture).toHaveAccessibleName("User profile");
    });

    it("with profile picture", () => {
      const userData = {
        username: "HumbertoBPF",
        bio: "My bio",
        picture: "image"
      };

      renderWithProviders(<Account user={userData} />);

      const usernameData = screen.getByTestId("username-data");
      expect(usernameData).toBeInTheDocument();
      expect(usernameData).toHaveTextContent(userData.username);

      const bioData = screen.getByTestId("bio-data");
      expect(bioData).toBeInTheDocument();
      expect(bioData).toHaveTextContent(userData.bio);

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).toBeInTheDocument();
      expect(profilePicture).toHaveAccessibleName("User profile");

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).not.toBeInTheDocument();
    });
  });

  describe("of authenticated user", () => {
    it("without profile picture", () => {
      const userData = {
        token: "token",
        username: "HumbertoBPF",
        bio: "My bio",
        email: "humberto@test.com",
        badges: []
      };

      renderWithProviders(<Account user={userData} />);

      const usernameData = screen.getByTestId("username-data");
      expect(usernameData).toBeInTheDocument();
      expect(usernameData).toHaveTextContent(userData.username);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      const bioData = screen.getByTestId("bio-data");
      expect(bioData).toBeInTheDocument();
      expect(bioData).toHaveTextContent(userData.bio);

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).not.toBeInTheDocument();

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).toBeInTheDocument();
      expect(defaultPicture).toHaveAccessibleName("User profile");
    });

    it("with profile picture", () => {
      const userData = {
        token: "token",
        username: "HumbertoBPF",
        bio: "My bio",
        email: "humberto@test.com",
        badges: [],
        picture: "picture"
      };

      renderWithProviders(<Account user={userData} />);

      const usernameData = screen.getByTestId("username-data");
      expect(usernameData).toBeInTheDocument();
      expect(usernameData).toHaveTextContent(userData.username);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      const bioData = screen.getByTestId("bio-data");
      expect(bioData).toBeInTheDocument();
      expect(bioData).toHaveTextContent(userData.bio);

      const profilePicture = screen.queryByTestId("profile-picture");
      expect(profilePicture).toBeInTheDocument();
      expect(profilePicture).toHaveAccessibleName("User profile");

      const defaultPicture = screen.queryByTestId("default-picture");
      expect(defaultPicture).not.toBeInTheDocument();
    });
  });
});
