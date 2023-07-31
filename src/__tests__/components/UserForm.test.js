const { screen, within } = require("@testing-library/react");
const { default: UserForm } = require("components/UserForm");
import userEvent from "@testing-library/user-event";
import { enterText } from "test-utils/actions/actions";
import { getAuthenticatedUser } from "test-utils/mocking/users";
import { renderWithProviders } from "test-utils/store";

const assertEmailField = (expectedValue) => {
  const emailField = screen.getByTestId("email-input");
  const emailLabel = within(emailField).getByLabelText("Email address");
  const emailInput = within(emailField).getByPlaceholderText("Email address");
  expect(emailField).toBeInTheDocument();
  expect(emailLabel).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");
  expect(emailInput).toHaveValue(expectedValue);
  expect(emailInput).toBeRequired();
};

const assertUsernameField = (expectedValue) => {
  const usernameField = screen.getByTestId("username-input");
  const usernameLabel = within(usernameField).getByLabelText("Username");
  const usernameInput = within(usernameField).getByPlaceholderText("Username");
  expect(usernameField).toBeInTheDocument();
  expect(usernameLabel).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(usernameInput).toHaveAttribute("type", "text");
  expect(usernameInput).toHaveValue(expectedValue);
  expect(usernameInput).toBeRequired();
};

const assertBioField = (expectedValue) => {
  const bioField = screen.getByTestId("bio-input");
  const bioLabel = within(bioField).getByLabelText("Bio");
  const bioInput = within(bioField).getByPlaceholderText("Bio");
  const bioDescription = within(bioField).getByText(
    `${expectedValue.length}/500 (The bio can have 500 characters at most)`
  );
  expect(bioField).toBeInTheDocument();
  expect(bioLabel).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(bioInput).toHaveValue(expectedValue);
  expect(bioDescription).toBeInTheDocument();
};

const assertPasswordField = () => {
  const passwordField = screen.getByTestId("password-input");
  const passwordLabel = within(passwordField).getByLabelText("Password");
  const passwordInput = within(passwordField).getByPlaceholderText("Password");
  expect(passwordField).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveValue("");
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(passwordInput).toBeRequired();
};

const assertConfirmationPasswordField = () => {
  const confirmPasswordField = screen.getByTestId(
    "password-confirmation-input"
  );
  const confirmPasswordLabel = within(confirmPasswordField).getByLabelText(
    "Confirm your password"
  );
  const confirmPasswordInput = within(
    confirmPasswordField
  ).getByPlaceholderText("Confirm your password");
  expect(confirmPasswordField).toBeInTheDocument();
  expect(confirmPasswordLabel).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toHaveValue("");
  expect(confirmPasswordInput).toHaveAttribute("type", "password");
  expect(confirmPasswordInput).toBeRequired();
};

describe("display the user form", () => {
  it("filled with user data", () => {
    const userData = getAuthenticatedUser();

    renderWithProviders(<UserForm user={userData} buttonText="Submit" />);

    assertEmailField(userData.email);
    assertUsernameField(userData.username);
    assertBioField(userData.bio);
    assertPasswordField();
    assertConfirmationPasswordField();

    const button = screen.getByTestId("submit-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });

  it("empty", () => {
    renderWithProviders(<UserForm buttonText="Submit" />);

    assertEmailField("");
    assertUsernameField("");
    assertBioField("");
    assertPasswordField();
    assertConfirmationPasswordField();

    const button = screen.getByTestId("submit-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });
});

it("should pass the form content to the callback function", async () => {
  const user = userEvent.setup();

  const formData = {
    username: "HumbertoBPF",
    email: "humberto@test.com",
    bio: "Humberto's bio",
    password: "str0ng-P4ssw0rd"
  };

  const callback = jest.fn((data) => data);

  renderWithProviders(<UserForm buttonText="Submit" onSubmit={callback} />);

  const emailField = screen.getByTestId("email-input");
  const usernameField = screen.getByTestId("username-input");
  const bioField = screen.getByTestId("bio-input");
  const passwordField = screen.getByTestId("password-input");
  const confirmPasswordField = screen.getByTestId(
    "password-confirmation-input"
  );
  const button = screen.getByTestId("submit-button");

  const emailInput = within(emailField).getByDisplayValue("");
  const usernameInput = within(usernameField).getByDisplayValue("");
  const bioInput = within(bioField).getByDisplayValue("");
  const passwordInput = within(passwordField).getByDisplayValue("");
  const confirmPasswordInput =
    within(confirmPasswordField).getByDisplayValue("");

  await user.type(emailInput, formData.email);
  await user.type(usernameInput, formData.username);
  await user.type(bioInput, formData.bio);
  await user.type(passwordInput, formData.password);
  await user.type(confirmPasswordInput, formData.password);
  await user.click(button);

  expect(callback).toBeCalled();
  expect(callback).toBeCalledWith(expect.anything(), formData);
});

describe("should validate", () => {
  it.each([
    ["", "This field is required."],
    ["humberto", "Enter a valid email address."]
  ])("the email field", async (email, message) => {
    const user = userEvent.setup();

    const formData = {
      email,
      username: "HumbertoBPF",
      bio: "Humberto's bio",
      password: "str0ng-P4ssw0rd",
      confirmPassword: "str0ng-P4ssw0rd"
    };

    const callback = jest.fn((data) => data);

    renderWithProviders(<UserForm buttonText="Submit" onSubmit={callback} />);

    const emailField = screen.getByTestId("email-input");
    const usernameField = screen.getByTestId("username-input");
    const bioField = screen.getByTestId("bio-input");
    const passwordField = screen.getByTestId("password-input");
    const confirmPasswordField = screen.getByTestId(
      "password-confirmation-input"
    );
    const button = screen.getByTestId("submit-button");

    const emailInput = within(emailField).getByDisplayValue("");
    const usernameInput = within(usernameField).getByDisplayValue("");
    const bioInput = within(bioField).getByDisplayValue("");
    const passwordInput = within(passwordField).getByDisplayValue("");
    const confirmPasswordInput =
      within(confirmPasswordField).getByDisplayValue("");

    await enterText(user, emailInput, formData.email);
    await enterText(user, usernameInput, formData.username);
    await enterText(user, bioInput, formData.bio);
    await enterText(user, passwordInput, formData.password);
    await enterText(user, confirmPasswordInput, formData.confirmPassword);
    await user.click(button);

    const emailError = within(emailField).getByText(message);
    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveTextContent(message);
  });

  it.each([
    [
      "Humberto BPF",
      "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
    ],
    ["Humb", "The username must be at least 8 characters-long."],
    ["", "This field is required."]
  ])("the username field", async (username, message) => {
    const user = userEvent.setup();

    const formData = {
      email: "humberto@test.com",
      username,
      bio: "Humberto's bio",
      password: "str0ng-P4ssw0rd",
      confirmPassword: "str0ng-P4ssw0rd"
    };

    const callback = jest.fn((data) => data);

    renderWithProviders(<UserForm buttonText="Submit" onSubmit={callback} />);

    const emailField = screen.getByTestId("email-input");
    const usernameField = screen.getByTestId("username-input");
    const bioField = screen.getByTestId("bio-input");
    const passwordField = screen.getByTestId("password-input");
    const confirmPasswordField = screen.getByTestId(
      "password-confirmation-input"
    );
    const button = screen.getByTestId("submit-button");

    const emailInput = within(emailField).getByDisplayValue("");
    const usernameInput = within(usernameField).getByDisplayValue("");
    const bioInput = within(bioField).getByDisplayValue("");
    const passwordInput = within(passwordField).getByDisplayValue("");
    const confirmPasswordInput =
      within(confirmPasswordField).getByDisplayValue("");

    await enterText(user, emailInput, formData.email);
    await enterText(user, usernameInput, formData.username);
    await enterText(user, bioInput, formData.bio);
    await enterText(user, passwordInput, formData.password);
    await enterText(user, confirmPasswordInput, formData.confirmPassword);
    await user.click(button);

    const usernameError = within(usernameField).getByText(message);
    expect(usernameError).toBeInTheDocument();
    expect(usernameError).toHaveTextContent(message);
  });

  it.each([
    ["strong-password", "The password must have at least one digit."],
    ["1234-5678", "The password must have at least one letter."],
    [
      "str0ngP4ssw0rd",
      "The password must have at least one special character."
    ],
    ["", "This field is required."],
    [
      "str0ng-P4ssw0rd-str0ng-P4ssw0rd",
      "The password must have a length between 8 and 30."
    ],
    ["p@sw0rd", "The password must have a length between 8 and 30."]
  ])("the password field", async (password, message) => {
    const user = userEvent.setup();

    const formData = {
      email: "humberto@test.com",
      username: "HumbertoBPF",
      bio: "Humberto's bio",
      password,
      confirmPassword: "str0ng-P4ssw0rd"
    };

    const callback = jest.fn((data) => data);

    renderWithProviders(<UserForm buttonText="Submit" onSubmit={callback} />);

    const emailField = screen.getByTestId("email-input");
    const usernameField = screen.getByTestId("username-input");
    const bioField = screen.getByTestId("bio-input");
    const passwordField = screen.getByTestId("password-input");
    const confirmPasswordField = screen.getByTestId(
      "password-confirmation-input"
    );
    const button = screen.getByTestId("submit-button");

    const emailInput = within(emailField).getByDisplayValue("");
    const usernameInput = within(usernameField).getByDisplayValue("");
    const bioInput = within(bioField).getByDisplayValue("");
    const passwordInput = within(passwordField).getByDisplayValue("");
    const confirmPasswordInput =
      within(confirmPasswordField).getByDisplayValue("");

    await enterText(user, emailInput, formData.email);
    await enterText(user, usernameInput, formData.username);
    await enterText(user, bioInput, formData.bio);
    await enterText(user, passwordInput, formData.password);
    await enterText(user, confirmPasswordInput, formData.confirmPassword);
    await user.click(button);

    const passwordError = within(passwordField).getByText(message);
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveTextContent(message);
  });

  it.each([
    ["str-P4s", "The passwords do not match."],
    ["", "This field is required."]
  ])("the password field", async (confirmPassword, message) => {
    const user = userEvent.setup();

    const formData = {
      email: "humberto@test.com",
      username: "HumbertoBPF",
      bio: "Humberto's bio",
      password: "str0ng-P4ssw0rd",
      confirmPassword
    };

    const callback = jest.fn((data) => data);

    renderWithProviders(<UserForm buttonText="Submit" onSubmit={callback} />);

    const emailField = screen.getByTestId("email-input");
    const usernameField = screen.getByTestId("username-input");
    const bioField = screen.getByTestId("bio-input");
    const passwordField = screen.getByTestId("password-input");
    const confirmPasswordField = screen.getByTestId(
      "password-confirmation-input"
    );
    const button = screen.getByTestId("submit-button");

    const emailInput = within(emailField).getByDisplayValue("");
    const usernameInput = within(usernameField).getByDisplayValue("");
    const bioInput = within(bioField).getByDisplayValue("");
    const passwordInput = within(passwordField).getByDisplayValue("");
    const confirmPasswordInput =
      within(confirmPasswordField).getByDisplayValue("");

    await enterText(user, emailInput, formData.email);
    await enterText(user, usernameInput, formData.username);
    await enterText(user, bioInput, formData.bio);
    await enterText(user, passwordInput, formData.password);
    await enterText(user, confirmPasswordInput, formData.confirmPassword);
    await user.click(button);

    const confirmPasswordError =
      within(confirmPasswordField).getByText(message);
    expect(confirmPasswordError).toBeInTheDocument();
    expect(confirmPasswordError).toHaveTextContent(message);
  });
});
