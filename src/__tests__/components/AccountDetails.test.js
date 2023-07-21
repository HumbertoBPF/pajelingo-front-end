const { screen } = require("@testing-library/react");
const { default: AccountDetails } = require("../../components/AccountDetails");
const { renderWithProviders } = require("utils/test-utils");

it("should display only username and bio when no email is specified", () => {
  const userData = {
    username: "HumbertoBPF",
    bio: "My bio"
  };

  renderWithProviders(<AccountDetails user={userData} />);

  const usernameData = screen.getByTestId("username-data");
  expect(usernameData).toBeInTheDocument();
  expect(usernameData).toHaveTextContent(`Username: ${userData.username}`);

  const emailData = screen.queryByTestId("email-data");
  expect(emailData).not.toBeInTheDocument();

  const bioData = screen.getByTestId("bio-data");
  expect(bioData).toBeInTheDocument();
  expect(bioData).toHaveTextContent(`Bio: ${userData.bio}`);
});

it("should display username, email, and bio when user email data is provided", () => {
  const userData = {
    username: "HumbertoBPF",
    email: "humberto@test.com",
    bio: "My bio"
  };

  renderWithProviders(<AccountDetails user={userData} />);

  const usernameData = screen.getByTestId("username-data");
  expect(usernameData).toBeInTheDocument();
  expect(usernameData).toHaveTextContent(`Username: ${userData.username}`);

  const emailData = screen.getByTestId("email-data");
  expect(emailData).toBeInTheDocument();
  expect(emailData).toHaveTextContent(`Email: ${userData.email}`);

  const bioData = screen.getByTestId("bio-data");
  expect(bioData).toBeInTheDocument();
  expect(bioData).toHaveTextContent(`Bio: ${userData.bio}`);
});
