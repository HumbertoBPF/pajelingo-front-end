const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { default: RequestResetAccount } = require("pages/RequestResetAccount");
const { renderWithProviders } = require("test-utils/store");
import { faker } from "@faker-js/faker/locale/en_US";
import { requestResetAccount } from "api/user";

jest.mock("api/user", () => {
  return {
    requestResetAccount: jest.fn()
  };
});

it("should render reset account form", () => {
  renderWithProviders(<RequestResetAccount />);

  const emailLabeledInput = screen.getByTestId("email-input");
  expect(emailLabeledInput).toBeInTheDocument();

  const emailInput = within(emailLabeledInput).getByPlaceholderText("Email");
  expect(emailInput).toHaveAttribute("type", "email");

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent("Reset password");
  expect(submitButton).toHaveClass("btn-success");
});

describe("should validate that email input", () => {
  it("is not empty", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RequestResetAccount />);

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput = within(emailLabeledInput).getByPlaceholderText("Email");

    await user.clear(emailInput);

    const validationError = within(emailLabeledInput).getByText(
      "This field is required."
    );
    expect(validationError).toBeInTheDocument();
    expect(validationError).toHaveTextContent("This field is required.");
  });

  it("is an email address", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RequestResetAccount />);

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput = within(emailLabeledInput).getByPlaceholderText("Email");

    await user.type(emailInput, faker.internet.userName());

    const validationError = within(emailLabeledInput).getByText(
      "Enter a valid email address."
    );
    expect(validationError).toBeInTheDocument();
    expect(validationError).toHaveTextContent("Enter a valid email address.");
  });
});

describe("should call API", () => {
  it("and display success alert when the form is submitted", async () => {
    const user = userEvent.setup();

    const email = faker.internet.email();

    requestResetAccount.mockImplementation((email, onSuccess) => {
      onSuccess();
    });

    renderWithProviders(<RequestResetAccount />);

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput = within(emailLabeledInput).getByPlaceholderText("Email");

    await user.type(emailInput, email);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(requestResetAccount).toHaveBeenCalledTimes(1);
    expect(requestResetAccount).toHaveBeenCalledWith(
      email,
      expect.anything(),
      expect.anything()
    );

    const successfulResetAlert = screen.getByTestId("successful-reset-alert");
    expect(successfulResetAlert).toBeInTheDocument();
    expect(successfulResetAlert).toHaveTextContent(
      "Check the specified email to reset your account. If there is an email associated with a Pajelingo account, you should have received an email with a reset link."
    );

    const successfulResetAlertImage =
      within(successfulResetAlert).getByAltText("Email being sent");
    expect(successfulResetAlertImage).toBeInTheDocument();
  });

  it("and display error toast in case of error", async () => {
    const user = userEvent.setup();

    const email = faker.internet.email();

    requestResetAccount.mockImplementation((email, onSuccess, onFail) => {
      onFail();
    });

    renderWithProviders(<RequestResetAccount />);

    const emailLabeledInput = screen.getByTestId("email-input");
    const emailInput = within(emailLabeledInput).getByPlaceholderText("Email");

    await user.type(emailInput, email);

    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);

    expect(requestResetAccount).toHaveBeenCalledTimes(1);
    expect(requestResetAccount).toHaveBeenCalledWith(
      email,
      expect.anything(),
      expect.anything()
    );

    const successfulResetAlert = screen.queryByTestId("successful-reset-alert");
    expect(successfulResetAlert).not.toBeInTheDocument();

    const errorToast = screen.getByTestId("error-toast");
    expect(errorToast).toBeInTheDocument();

    const errorToastTitle = within(errorToast).getByText("Error");
    expect(errorToastTitle).toBeInTheDocument();
    expect(errorToastTitle).toHaveTextContent("Error");

    const errorToastMessage = within(errorToast).getByText(
      "It was not possible to request the account reset. Please check the information provided."
    );
    expect(errorToastMessage).toBeInTheDocument();
    expect(errorToastMessage).toHaveTextContent(
      "It was not possible to request the account reset. Please check the information provided."
    );
  });
});
