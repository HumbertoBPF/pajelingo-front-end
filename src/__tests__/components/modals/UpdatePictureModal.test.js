const { screen, within } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const {
  default: UpdatePictureModal
} = require("components/dialogs/UpdatePictureModal");
const { renderWithProviders } = require("test-utils/store");
const { errorFileIsNotImage } = require("validators/validators");

const assertDialogTitle = () => {
  const modalTitle = screen.getByTestId("modal-title");
  expect(modalTitle).toBeInTheDocument();
  expect(modalTitle).toHaveTextContent("Update profile picture");
};

const assertDialogBody = () => {
  const modalBody = screen.getByTestId("update-file-input");
  expect(modalBody).toBeInTheDocument();
  const uploadFileInput = within(modalBody).getByPlaceholderText("");
  expect(uploadFileInput).toBeInTheDocument();
  expect(uploadFileInput).toHaveAttribute("type", "file");
};

const assertCancelButton = () => {
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton).toHaveTextContent("Cancel");
  expect(cancelButton).toHaveClass("btn-secondary");
};

const assertUpdateButton = () => {
  const uploadButton = screen.getByTestId("update-button");
  expect(uploadButton).toBeInTheDocument();
  expect(uploadButton).toHaveTextContent("Update");
  expect(uploadButton).toHaveClass("btn-success");
};

it("should not display when the show prop is false", () => {
  renderWithProviders(<UpdatePictureModal show={false} isLoading={false} />);

  const updatePictureModal = screen.queryByTestId("update-picture-modal");
  expect(updatePictureModal).not.toBeInTheDocument();
});

it("should display modal when the show prop is true", () => {
  renderWithProviders(<UpdatePictureModal show isLoading={false} />);

  const updatePictureModal = screen.queryByTestId("update-picture-modal");
  expect(updatePictureModal).toBeInTheDocument();

  assertDialogTitle();
  assertDialogBody();
  assertCancelButton();
  assertUpdateButton();

  const buttonSpinner =
    within(updatePictureModal).queryByTestId("button-spinner");
  expect(buttonSpinner).not.toBeInTheDocument();
});

it("should display modal with loading button when the loading prop is true", () => {
  renderWithProviders(<UpdatePictureModal show isLoading />);

  const updatePictureModal = screen.queryByTestId("update-picture-modal");
  expect(updatePictureModal).toBeInTheDocument();

  assertDialogTitle();
  assertDialogBody();
  assertCancelButton();
  assertUpdateButton();

  const buttonSpinner =
    within(updatePictureModal).queryByTestId("button-spinner");
  expect(buttonSpinner).toBeInTheDocument();
});

it("should display validation message when the uploaded file is not an image file", async () => {
  const user = userEvent.setup();

  renderWithProviders(<UpdatePictureModal show isLoading={false} />);

  const modalBody = screen.getByTestId("update-file-input");

  const uploadFileInput = within(modalBody).getByPlaceholderText("");

  const file = new File(["text-file"], "text-file.txt");
  await user.upload(uploadFileInput, file);

  const fileFormatError = within(modalBody).getByText(errorFileIsNotImage);
  expect(fileFormatError).toBeInTheDocument();
  expect(fileFormatError).toHaveTextContent(errorFileIsNotImage);
});

it("should call onClose callback when clicking on the cancel button", async () => {
  const user = userEvent.setup();

  const onClose = jest.fn();

  renderWithProviders(
    <UpdatePictureModal show isLoading={false} onClose={onClose} />
  );

  const updatePictureModal = screen.queryByTestId("update-picture-modal");

  const cancelButton = within(updatePictureModal).getByTestId("cancel-button");
  await user.click(cancelButton);

  expect(onClose).toHaveBeenCalledTimes(1);
});

it("should call onSubmit callback when clicking on the update button", async () => {
  const user = userEvent.setup();

  const onSubmit = jest.fn();

  renderWithProviders(
    <UpdatePictureModal show isLoading={false} onSubmit={onSubmit} />
  );

  const updatePictureModal = screen.queryByTestId("update-picture-modal");

  const modalBody = screen.getByTestId("update-file-input");

  const uploadFileInput = within(modalBody).getByPlaceholderText("");

  const file = new File(["python-test-image"], "python-test-image.jpg");
  await user.upload(uploadFileInput, file);

  const updateButton = within(updatePictureModal).getByTestId("update-button");
  await user.click(updateButton);

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith(file);
});
