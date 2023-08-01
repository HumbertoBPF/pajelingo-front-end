const { faker } = require("@faker-js/faker/locale/en_US");
const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { signup } = require("api/user");
const { default: SignUp } = require("pages/SignUp");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    signup: jest.fn()
  };
});

describe("should call API when submitting form", () => {
  it("and display successful feedback", async () => {
    signup.mockImplementation((body, onSuccess) => {
      onSuccess();
    });

    const user = userEvent.setup();

    const signupPayload = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      bio: faker.person.bio(),
      password: "str0ng-p@ssw0rd",
      confirmPassword: "str0ng-p@ssw0rd"
    };

    renderWithProviders(<SignUp />);

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput =
      within(emailLabeledInput).getByPlaceholderText("Email address");
    await user.type(emailInput, signupPayload.email);

    const usernameLabeledInput = screen.getByTestId("username-input");
    const usernameInput =
      within(usernameLabeledInput).getByPlaceholderText("Username");
    await user.type(usernameInput, signupPayload.username);

    const bioLabeledInput = screen.getByTestId("bio-input");
    const bioInput = within(bioLabeledInput).getByPlaceholderText("Bio");
    await user.type(bioInput, signupPayload.bio);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");
    await user.type(passwordInput, signupPayload.password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "password-confirmation-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");
    await user.type(confirmPasswordInput, signupPayload.confirmPassword);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(signup).toHaveBeenCalledTimes(1);
    expect(signup).toHaveBeenCalledWith(
      {
        email: signupPayload.email,
        username: signupPayload.username,
        bio: signupPayload.bio,
        password: signupPayload.password
      },
      expect.anything(),
      expect.anything()
    );

    const successAlert = screen.getByTestId("success-alert");
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toHaveTextContent(
      "Account successfully created. Please check your email to activate it."
    );

    const imageSuccessAlert =
      within(successAlert).getByAltText("Email being sent");
    expect(imageSuccessAlert).toBeInTheDocument();

    const errorToast = screen.queryByTestId("error-toast");
    expect(errorToast).not.toBeInTheDocument();
  });

  it("and display error feedback", async () => {
    signup.mockImplementation((body, onSuccess, onFail) => {
      onFail();
    });

    const user = userEvent.setup();

    const signupPayload = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      bio: faker.person.bio(),
      password: "str0ng-p@ssw0rd",
      confirmPassword: "str0ng-p@ssw0rd"
    };

    renderWithProviders(<SignUp />);

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput =
      within(emailLabeledInput).getByPlaceholderText("Email address");
    await user.type(emailInput, signupPayload.email);

    const usernameLabeledInput = screen.getByTestId("username-input");
    const usernameInput =
      within(usernameLabeledInput).getByPlaceholderText("Username");
    await user.type(usernameInput, signupPayload.username);

    const bioLabeledInput = screen.getByTestId("bio-input");
    const bioInput = within(bioLabeledInput).getByPlaceholderText("Bio");
    await user.type(bioInput, signupPayload.bio);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");
    await user.type(passwordInput, signupPayload.password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "password-confirmation-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");
    await user.type(confirmPasswordInput, signupPayload.confirmPassword);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(signup).toHaveBeenCalledTimes(1);
    expect(signup).toHaveBeenCalledWith(
      {
        email: signupPayload.email,
        username: signupPayload.username,
        bio: signupPayload.bio,
        password: signupPayload.password
      },
      expect.anything(),
      expect.anything()
    );

    const successAlert = screen.queryByTestId("success-alert");
    expect(successAlert).not.toBeInTheDocument();

    const errorToast = screen.getByTestId("error-toast");
    expect(errorToast).toBeInTheDocument();

    const errorToastTitle = within(errorToast).getByText("Error");
    expect(errorToastTitle).toBeInTheDocument();
    expect(errorToastTitle).toHaveTextContent("Error");

    const errorToastMessage = within(errorToast).getByText(
      "It was not possible to create account. Please check the information provided."
    );
    expect(errorToastMessage).toBeInTheDocument();
    expect(errorToastMessage).toHaveTextContent(
      "It was not possible to create account. Please check the information provided."
    );
  });
});
