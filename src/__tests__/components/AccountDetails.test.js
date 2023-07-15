const { screen } = require("@testing-library/react");
const { default: AccountDetails } = require("../../components/AccountDetails");
const { renderWithProviders } = require("utils/test-utils");

it("should display only username and bio when no email is specified", () => {
  const user = {
    username: "HumbertoBPF",
    bio: "My bio"
  };

  renderWithProviders(<AccountDetails user={user} />);

  const usernameData = screen.getByTestId("username-data");
  const emailData = screen.queryByTestId("email-data");
  const bioData = screen.getByTestId("bio-data");

  expect(usernameData.textContent).toBe(` Username: ${user.username}`);
  expect(emailData).not.toBeInTheDocument();
  expect(bioData.textContent).toBe(` Bio: ${user.bio}`);
});

it("should display username, email, and bio when user email data is provided", () => {
  const user = {
    username: "HumbertoBPF",
    email: "humberto@test.com",
    bio: "My bio"
  };

  renderWithProviders(<AccountDetails user={user} />);

  const usernameData = screen.getByTestId("username-data");
  const emailData = screen.getByTestId("email-data");
  const bioData = screen.getByTestId("bio-data");

  expect(usernameData.textContent).toBe(` Username: ${user.username}`);
  expect(emailData.textContent).toBe(` Email: ${user.email}`);
  expect(bioData.textContent).toBe(` Bio: ${user.bio}`);
});
