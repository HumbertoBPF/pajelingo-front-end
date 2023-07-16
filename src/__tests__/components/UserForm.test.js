const { screen, within } = require("@testing-library/react");
const { default: UserForm } = require("components/UserForm");
import userEvent from "@testing-library/user-event";
import signupData from "../test-data/signup-data.json";
import { renderWithProviders } from "utils/test-utils";

async function enterText(user, element, text) {
  if (text) {
    await user.type(element, text);
  } else {
    await user.clear(element);
  }
}

it.each([
  [undefined],
  [
    {
      username: "HumbertoBPF",
      email: "humberto@test.com",
      bio: "Humberto's bio"
    }
  ]
])(
  "should display the correct text on the form fields and on the submit button",
  (user) => {
    const expectedEmail = user ? user.email : "";
    const expectedUsername = user ? user.username : "";
    const expectedBio = user ? user.bio : "";

    renderWithProviders(<UserForm user={user} buttonText="Submit" />);

    const emailField = screen.getByTestId("email-input");
    const emailLabel = within(emailField).getByLabelText("Email address");
    const emailInput = within(emailField).getByPlaceholderText("Email address");
    expect(emailField).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveValue(expectedEmail);
    expect(emailInput).toBeRequired();

    const usernameField = screen.getByTestId("username-input");
    const usernameLabel = within(usernameField).getByLabelText("Username");
    const usernameInput =
      within(usernameField).getByPlaceholderText("Username");
    expect(usernameField).toBeInTheDocument();
    expect(usernameLabel).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");
    expect(usernameInput).toHaveValue(expectedUsername);
    expect(usernameInput).toBeRequired();

    const bioField = screen.getByTestId("bio-input");
    const bioLabel = within(bioField).getByLabelText("Bio");
    const bioInput = within(bioField).getByPlaceholderText("Bio");
    const bioDescription = within(bioField).getByText(
      `${expectedBio.length}/500 (The bio can have 500 characters at most)`
    );
    expect(bioField).toBeInTheDocument();
    expect(bioLabel).toBeInTheDocument();
    expect(bioInput).toBeInTheDocument();
    expect(bioInput).toHaveValue(expectedBio);
    expect(bioDescription).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-input");
    const passwordLabel = within(passwordField).getByLabelText("Password");
    const passwordInput =
      within(passwordField).getByPlaceholderText("Password");
    expect(passwordField).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toBeRequired();

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

    const button = screen.getByTestId("submit-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  }
);

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

  const newEmailInput = within(emailField).getByDisplayValue(formData.email);
  const newUsernameInput = within(usernameField).getByDisplayValue(
    formData.username
  );
  const newBioInput = within(bioField).getByDisplayValue(formData.bio);
  const newPasswordInput = within(passwordField).getByDisplayValue(
    formData.password
  );
  const newConfirmPasswordInput = within(
    confirmPasswordField
  ).getByDisplayValue(formData.password);

  expect(newEmailInput).toBeInTheDocument();
  expect(newUsernameInput).toBeInTheDocument();
  expect(newBioInput).toBeInTheDocument();
  expect(newPasswordInput).toBeInTheDocument();
  expect(newConfirmPasswordInput).toBeInTheDocument();
  expect(callback).toBeCalled();
  expect(callback).toBeCalledWith(expect.anything(), formData);
});

it.each(signupData.data)(
  "should validate the form content",
  async (email, username, bio, password, confirmPassword) => {
    const user = userEvent.setup();

    const formData = {
      username: username.value,
      email: email.value,
      bio: bio.value,
      password: password.value
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

    await enterText(user, emailInput, email.value);
    await enterText(user, usernameInput, username.value);
    await enterText(user, bioInput, bio.value);
    await enterText(user, passwordInput, password.value);
    await enterText(user, confirmPasswordInput, confirmPassword.value);

    await user.click(button);

    const newEmailInput = within(emailField).getByDisplayValue(email.value);
    const newUsernameInput = within(usernameField).getByDisplayValue(
      username.value
    );
    const newBioInput = within(bioField).getByDisplayValue(bio.value);
    const newPasswordInput = within(passwordField).getByDisplayValue(
      password.value
    );
    const newPasswordConfirmationInput = within(
      confirmPasswordField
    ).getByDisplayValue(confirmPassword.value);

    if (email.error) {
      const emailError = within(emailField).getByText(email.error);
      expect(emailError).toBeInTheDocument();
    }

    if (username.error) {
      const usernameError = within(usernameField).getByText(username.error);
      expect(usernameError).toBeInTheDocument();
    }

    if (bio.error) {
      const bioError = within(bioField).getByText(bio.error);
      expect(bioError).toBeInTheDocument();
    }

    if (password.error) {
      const passwordError = within(passwordField).getByText(password.error);
      expect(passwordError).toBeInTheDocument();
    }

    if (confirmPassword.error) {
      const confirmPasswordError = within(confirmPasswordField).getByText(
        confirmPassword.error
      );
      expect(confirmPasswordError).toBeInTheDocument();
    }

    expect(newEmailInput).toBeInTheDocument();
    expect(newUsernameInput).toBeInTheDocument();
    expect(newBioInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(newPasswordConfirmationInput).toBeInTheDocument();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith(expect.anything(), formData);
  }
);
