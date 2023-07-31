const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { resetAccount } = require("api/user");
const { default: ResetAccount } = require("pages/ResetAccount");
const { enterText } = require("test-utils/actions/actions");
const { renderWithProviders } = require("test-utils/store");

jest.mock("api/user", () => {
  return {
    resetAccount: jest.fn()
  };
});

it("should render reset account form", () => {
  renderWithProviders(<ResetAccount />);

  const passwordLabeledInput = screen.getByTestId("password-input");
  expect(passwordLabeledInput).toBeInTheDocument();

  const passwordInput =
    within(passwordLabeledInput).getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute("type", "password");

  const confirmPasswordLabeledInput = screen.getByTestId(
    "confirm-password-input"
  );
  expect(confirmPasswordLabeledInput).toBeInTheDocument();

  const confirmPasswordInput = within(
    confirmPasswordLabeledInput
  ).getByPlaceholderText("Confirm your password");
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toHaveAttribute("type", "password");

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent("Submit");
  expect(submitButton).toHaveClass("btn-success");
});

describe("should validate", () => {
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

    renderWithProviders(<ResetAccount />);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");

    await enterText(user, passwordInput, password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "confirm-password-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");

    expect(passwordInput).toHaveClass("is-invalid");
    expect(confirmPasswordInput).not.toHaveClass("is-invalid");

    const validationError = within(passwordLabeledInput).getByText(message);
    expect(validationError).toBeInTheDocument();
  });

  it.each([
    ["", "This field is required."],
    ["str0ng-P@ssw0rd", "The passwords do not match."]
  ])("the confirm password field", async (passwordConfirmation, message) => {
    const user = userEvent.setup();

    renderWithProviders(<ResetAccount />);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");

    await enterText(user, passwordInput, "str0ng-P4ssw0rd");

    const confirmPasswordLabeledInput = screen.getByTestId(
      "confirm-password-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");

    await enterText(user, confirmPasswordInput, passwordConfirmation);

    expect(passwordInput).not.toHaveClass("is-invalid");
    expect(confirmPasswordInput).toHaveClass("is-invalid");

    const validationError = within(confirmPasswordLabeledInput).getByText(
      message
    );
    expect(validationError).toBeInTheDocument();
  });
});

describe("should call API", () => {
  it("and display success alert when the form is submitted", async () => {
    const user = userEvent.setup();

    const password = "str0ng-P4ssw0rd";

    resetAccount.mockImplementation((uid, token, password, onSuccess) => {
      onSuccess();
    });

    renderWithProviders(<ResetAccount />);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");

    await enterText(user, passwordInput, password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "confirm-password-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");

    await enterText(user, confirmPasswordInput, password);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(resetAccount).toHaveBeenCalledTimes(1);
    expect(resetAccount).toHaveBeenCalledWith(
      undefined,
      undefined,
      password,
      expect.anything(),
      expect.anything()
    );

    const successfulResetAlert = screen.getByTestId("successful-reset-alert");
    expect(successfulResetAlert).toBeInTheDocument;
    expect(successfulResetAlert).toHaveTextContent(
      "Password successfully updated!"
    );

    const dashboardButton = screen.getByTestId("dashboard-button");
    expect(dashboardButton).toBeInTheDocument();
    expect(dashboardButton).toHaveTextContent("Go to dashboard");
    expect(dashboardButton).toHaveClass("btn-primary");

    const loginButton = screen.getByTestId("login-button");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent("Login");
    expect(loginButton).toHaveClass("btn-success");

    const errorToast = screen.queryByTestId("error-toast");
    expect(errorToast).not.toBeInTheDocument();
  });

  it("and display error toast in case of error", async () => {
    const user = userEvent.setup();

    const password = "str0ng-P4ssw0rd";

    resetAccount.mockImplementation(
      (uid, token, password, onSuccess, onFail) => {
        onFail();
      }
    );

    renderWithProviders(<ResetAccount />);

    const passwordLabeledInput = screen.getByTestId("password-input");
    const passwordInput =
      within(passwordLabeledInput).getByPlaceholderText("Password");

    await enterText(user, passwordInput, password);

    const confirmPasswordLabeledInput = screen.getByTestId(
      "confirm-password-input"
    );
    const confirmPasswordInput = within(
      confirmPasswordLabeledInput
    ).getByPlaceholderText("Confirm your password");

    await enterText(user, confirmPasswordInput, password);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(resetAccount).toHaveBeenCalledTimes(1);
    expect(resetAccount).toHaveBeenCalledWith(
      undefined,
      undefined,
      password,
      expect.anything(),
      expect.anything()
    );

    const successfulResetAlert = screen.queryByTestId("successful-reset-alert");
    expect(successfulResetAlert).not.toBeInTheDocument;

    const dashboardButton = screen.queryByTestId("dashboard-button");
    expect(dashboardButton).not.toBeInTheDocument();

    const loginButton = screen.queryByTestId("login-button");
    expect(loginButton).not.toBeInTheDocument();

    const errorToast = screen.getByTestId("error-toast");
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
