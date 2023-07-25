const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const {
  default: DeleteAccountDialog
} = require("components/modals/DeleteAccountModal");
const { renderWithProviders } = require("test-utils/store");
const { errorDeletionConfirmationText } = require("validators/validators");

const expectedTextBody =
  'Write "permanently delete" to confirm. Notice that personal data such as game scores will be permanently lost!';

const assertDialogTitle = () => {
  const modalTitle = screen.getByTestId("modal-title");
  expect(modalTitle).toBeInTheDocument();
  expect(modalTitle).toHaveTextContent("Are you sure?");
};

const assertDialogBody = () => {
  const modalBody = screen.getByTestId("confirm-delete-input");
  expect(modalBody).toBeInTheDocument();
  const modalBodyText = within(modalBody).getByLabelText(expectedTextBody);
  expect(modalBodyText).toBeInTheDocument();

  const confirmDeletionInput =
    within(modalBody).getByPlaceholderText("permanently delete");
  expect(confirmDeletionInput).toBeInTheDocument();
  expect(confirmDeletionInput).toHaveAttribute("type", "text");
};

const assertCancelButton = () => {
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton).toHaveTextContent("Cancel");
  expect(cancelButton).toHaveClass("btn-secondary");
};

const assertDeleteButton = () => {
  const deleteButton = screen.getByTestId("delete-button");
  expect(deleteButton).toBeInTheDocument();
  expect(deleteButton).toHaveTextContent("Yes, I want to delete my profile");
  expect(deleteButton).toHaveClass("btn-danger");
};

it("should not display dialog when the show prop is false", () => {
  renderWithProviders(<DeleteAccountDialog show={false} isLoading={false} />);

  const deleteAccountModal = screen.queryByTestId("delete-account-modal");
  expect(deleteAccountModal).not.toBeInTheDocument();
});

it("should display modal when the show prop is true", () => {
  renderWithProviders(<DeleteAccountDialog show isLoading={false} />);

  const deleteAccountModal = screen.getByTestId("delete-account-modal");
  expect(deleteAccountModal).toBeInTheDocument();

  assertDialogTitle();
  assertDialogBody();
  assertCancelButton();
  assertDeleteButton();

  const buttonSpinner =
    within(deleteAccountModal).queryByTestId("button-spinner");
  expect(buttonSpinner).not.toBeInTheDocument();
});

it("should display modal with loading button when the loading prop is true", () => {
  renderWithProviders(<DeleteAccountDialog show isLoading />);

  const deleteAccountModal = screen.getByTestId("delete-account-modal");
  expect(deleteAccountModal).toBeInTheDocument();

  assertDialogTitle();
  assertDialogBody();
  assertCancelButton();
  assertDeleteButton();

  const buttonSpinner =
    within(deleteAccountModal).getByTestId("button-spinner");
  expect(buttonSpinner).toBeInTheDocument();
});

it("should display validation message when the message does not match 'permanently delete'", async () => {
  const user = userEvent.setup();

  renderWithProviders(<DeleteAccountDialog show isLoading={false} />);
  // Inputting wrong confirmation text
  const modalBody = screen.getByTestId("confirm-delete-input");
  const confirmDeletionInput =
    within(modalBody).getByPlaceholderText("permanently delete");
  await user.type(confirmDeletionInput, "Wrong text");
  // Checking validation error message
  const confirmDeletionError = within(modalBody).getByText(
    errorDeletionConfirmationText
  );
  expect(confirmDeletionError).toBeInTheDocument();
  expect(confirmDeletionError).toHaveTextContent(errorDeletionConfirmationText);
});

it("should call onClose callback when clicking on the cancel button", async () => {
  const user = userEvent.setup();

  const onClose = jest.fn();

  renderWithProviders(
    <DeleteAccountDialog show isLoading={false} onClose={onClose} />
  );

  const deleteAccountModal = screen.getByTestId("delete-account-modal");
  const cancelButton = within(deleteAccountModal).getByTestId("cancel-button");
  await user.click(cancelButton);

  expect(onClose).toHaveBeenCalledTimes(1);
});

it("should call onSubmit callback when clicking on the delete button", async () => {
  const user = userEvent.setup();

  const onSubmit = jest.fn();

  renderWithProviders(
    <DeleteAccountDialog show isLoading={false} onSubmit={onSubmit} />
  );
  // Inputting confirmation text
  const modalBody = screen.getByTestId("confirm-delete-input");
  const confirmDeletionInput =
    within(modalBody).getByPlaceholderText("permanently delete");
  await user.type(confirmDeletionInput, "permanently delete");
  // Checking that no error is displayed
  const confirmDeletionError = within(modalBody).queryByText(
    errorDeletionConfirmationText
  );
  expect(confirmDeletionError).not.toBeInTheDocument();
  // Submitting the delete account form
  const deleteAccountModal = screen.getByTestId("delete-account-modal");
  const deleteButton = within(deleteAccountModal).getByTestId("delete-button");
  await user.click(deleteButton);

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenLastCalledWith("permanently delete");
});
