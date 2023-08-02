const { faker } = require("@faker-js/faker/locale/en_US");
const { within, screen } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { updateAccount } = require("api/user");
const { default: UpdateAccount } = require("pages/UpdateAccount");
const { getAuthenticatedUser } = require("test-utils/mocking/users");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    getUser: jest.fn(),
    updateAccount: jest.fn()
  };
});

const payload = {
  email: faker.internet.email(),
  username: faker.string.alphanumeric({ length: { min: 8, max: 64 } }),
  bio: faker.person.bio(),
  password: "str0ng-p@ssw0rd",
  confirmPassword: "str0ng-p@ssw0rd"
};

const mockedUser = getAuthenticatedUser("picture");

describe("should call API when submitting form", () => {
  it("and display successful feedback", async () => {
    updateAccount.mockImplementation((token, body, onSuccess) => {
      onSuccess();
    });

    const user = userEvent.setup();

    renderWithProviders(<UpdateAccount />, {
      preloadedState: {
        user: mockedUser
      }
    });

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput =
      within(emailLabeledInput).getByPlaceholderText("Email address");
    await user.clear(emailInput);
    await user.type(emailInput, payload.email);

    const usernameLabeledInput = screen.getByTestId("username-input");
    const usernameInput =
      within(usernameLabeledInput).getByPlaceholderText("Username");
    await user.clear(usernameInput);
    await user.type(usernameInput, payload.username);

    const bioLabeledInput = screen.getByTestId("bio-input");
    const bioInput = within(bioLabeledInput).getByPlaceholderText("Bio");
    await user.clear(bioInput);
    await user.type(bioInput, payload.bio);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");
    await user.clear(passwordInput);
    await user.type(passwordInput, payload.password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "password-confirmation-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");
    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, payload.confirmPassword);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(updateAccount).toHaveBeenCalledTimes(1);
    expect(updateAccount).toHaveBeenCalledWith(
      mockedUser.token,
      {
        email: payload.email,
        username: payload.username,
        bio: payload.bio,
        password: payload.password
      },
      expect.anything(),
      expect.anything()
    );

    const errorToast = screen.queryByTestId("error-toast");
    expect(errorToast).not.toBeInTheDocument();
  });

  it("and display error feedback", async () => {
    updateAccount.mockImplementation((token, body, onSuccess, onFail) => {
      onFail();
    });

    const user = userEvent.setup();

    renderWithProviders(<UpdateAccount />, {
      preloadedState: {
        user: mockedUser
      }
    });

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput =
      within(emailLabeledInput).getByPlaceholderText("Email address");
    await user.clear(emailInput);
    await user.type(emailInput, payload.email);

    const usernameLabeledInput = screen.getByTestId("username-input");
    const usernameInput =
      within(usernameLabeledInput).getByPlaceholderText("Username");
    await user.clear(usernameInput);
    await user.type(usernameInput, payload.username);

    const bioLabeledInput = screen.getByTestId("bio-input");
    const bioInput = within(bioLabeledInput).getByPlaceholderText("Bio");
    await user.clear(bioInput);
    await user.type(bioInput, payload.bio);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");
    await user.clear(passwordInput);
    await user.type(passwordInput, payload.password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "password-confirmation-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");
    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, payload.confirmPassword);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(updateAccount).toHaveBeenCalledTimes(1);
    expect(updateAccount).toHaveBeenCalledWith(
      mockedUser.token,
      {
        email: payload.email,
        username: payload.username,
        bio: payload.bio,
        password: payload.password
      },
      expect.anything(),
      expect.anything()
    );

    const errorToast = screen.queryByTestId("error-toast");
    expect(errorToast).toBeInTheDocument();

    const errorToastTitle = within(errorToast).getByText("Error");
    expect(errorToastTitle).toBeInTheDocument();
    expect(errorToastTitle).toHaveTextContent("Error");

    const errorToastMessage = within(errorToast).getByText(
      "It was not possible to update account. Please check the information provided."
    );
    expect(errorToastMessage).toBeInTheDocument();
    expect(errorToastMessage).toHaveTextContent(
      "It was not possible to update account. Please check the information provided."
    );
  });
});
