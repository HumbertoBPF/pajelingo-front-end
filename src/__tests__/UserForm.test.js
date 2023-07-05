const { render, screen, within } = require("@testing-library/react");
const { default: UserForm } = require("components/UserForm");
import userEvent from "@testing-library/user-event";
import signupData from "./test-data/signup-data.json";

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

    render(<UserForm user={user} buttonText="Submit" />);

    const emailField = screen.getByTestId("email-input");
    const emailLabel = within(emailField).getByLabelText("Email address");
    const emailPlaceholder =
      within(emailField).getByPlaceholderText("Email address");
    const emailInput = within(emailField).getByDisplayValue(expectedEmail);

    const usernameField = screen.getByTestId("username-input");
    const usernameLabel = within(usernameField).getByLabelText("Username");
    const usernamePlaceholder =
      within(usernameField).getByPlaceholderText("Username");
    const usernameInput =
      within(usernameField).getByDisplayValue(expectedUsername);

    const bioField = screen.getByTestId("bio-input");
    const bioLabel = screen.getByLabelText("Bio");
    const bioPlaceholder = screen.getByPlaceholderText("Bio");
    const bioInput = within(bioField).getByDisplayValue(expectedBio);
    const bioDescription = within(bioField).getByText(
      `${expectedBio.length}/500 (The bio can have 500 characters at most)`
    );

    const button = screen.getByTestId("submit-button");

    expect(emailLabel).toBeInTheDocument();
    expect(emailPlaceholder).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(usernameLabel).toBeInTheDocument();
    expect(usernamePlaceholder).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(bioLabel).toBeInTheDocument();
    expect(bioPlaceholder).toBeInTheDocument();
    expect(bioInput).toBeInTheDocument();
    expect(bioDescription).toBeInTheDocument();
    expect(button.textContent).toBe("Submit");
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

  render(<UserForm buttonText="Submit" onSubmit={callback} />);

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

    render(<UserForm buttonText="Submit" onSubmit={callback} />);

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
