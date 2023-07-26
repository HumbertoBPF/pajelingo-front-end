const { screen, within } = require("@testing-library/react");
const { default: Account } = require("components/Account");
const { renderWithProviders } = require("test-utils/store");
import userEvent from "@testing-library/user-event";
import { getUserScores } from "api/scores";
import { getRandomInteger } from "utils";
import {
  assertBadgeListSection,
  assertDefaultPicture,
  assertErrorToast,
  assertLateralMenu,
  assertProfilePicture,
  assertPublicInformation,
  assertUpdatePictureButton,
  assertUserScores,
  assertUserScoresSection
} from "test-utils/custom-assertions/profile";
import { deleteUser, updateUserPicture } from "api/user";
import {
  errorDeletionConfirmationText,
  genericErrorMessage
} from "validators/validators";
import {
  getAuthenticatedUser,
  getUnauthenticatedUser
} from "test-utils/mocking/users";
import { languages } from "test-utils/mocking/languages";
import { scores } from "test-utils/mocking/scores";

jest.mock("api/scores", () => {
  return {
    getUserScores: jest.fn()
  };
});

jest.mock("api/languages", () => {
  const originalModule = jest.requireActual("api/languages");

  return {
    __esmodule: true,
    ...originalModule,
    getLanguages: jest.fn()
  };
});

jest.mock("api/user", () => {
  return {
    deleteUser: jest.fn(),
    updateUserPicture: jest.fn()
  };
});

describe("should display account information", () => {
  describe("of non-authenticated user", () => {
    it("without profile picture", () => {
      const userData = getUnauthenticatedUser();

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.queryByTestId("email-data");
      expect(emailData).not.toBeInTheDocument();

      assertDefaultPicture();
      assertBadgeListSection(userData.badges);
      assertUserScoresSection();
    });

    it("with profile picture", () => {
      const userData = getUnauthenticatedUser("picture");

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.queryByTestId("email-data");
      expect(emailData).not.toBeInTheDocument();

      assertProfilePicture();
      assertBadgeListSection(userData.badges);
      assertUserScoresSection();
    });
  });

  describe("of authenticated user", () => {
    it("without profile picture", () => {
      const userData = getAuthenticatedUser();

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      assertDefaultPicture();
      assertUpdatePictureButton();
      assertLateralMenu();
      assertBadgeListSection(userData.badges);
      assertUserScoresSection();
    });

    it("with profile picture", () => {
      const userData = getAuthenticatedUser("picture");

      renderWithProviders(<Account user={userData} />);

      assertPublicInformation(userData);

      const emailData = screen.getByTestId("email-data");
      expect(emailData).toBeInTheDocument();
      expect(emailData).toHaveTextContent(userData.email);

      assertProfilePicture();
      assertUpdatePictureButton();
      assertLateralMenu();
      assertBadgeListSection(userData.badges);
      assertUserScoresSection();
    });
  });
});

it("should call the API when a language is selected", async () => {
  getUserScores.mockImplementation((language, username, onSuccess) => {
    if (language === languages[0].language_name) {
      onSuccess(scores.default);
      return;
    }

    onSuccess(scores.others);
  });

  const user = userEvent.setup();

  const userData = getUnauthenticatedUser("picture");

  renderWithProviders(<Account user={userData} />, {
    preloadedState: {
      languages
    }
  });
  // First call to firstly populate the user scores
  expect(getUserScores).toHaveBeenCalledTimes(1);
  expect(getUserScores).toHaveBeenCalledWith(
    languages[0].language_name,
    userData.username,
    expect.anything()
  );

  assertUserScores(scores.default);

  const selectLanguage = screen.getByTestId("select-language");

  await user.click(selectLanguage);

  expect(getUserScores).toHaveBeenCalledTimes(2);
  expect(getUserScores).toHaveBeenCalledWith(
    languages[0].language_name,
    userData.username,
    expect.anything()
  );

  assertUserScores(scores.default);

  const randomLanguage = languages[getRandomInteger(1, 4)];

  const randomLanguageItem = within(selectLanguage).getByText(
    randomLanguage.language_name
  );

  await user.click(randomLanguageItem);

  expect(getUserScores).toHaveBeenCalledTimes(3);
  expect(getUserScores).toHaveBeenCalledWith(
    randomLanguage.language_name,
    userData.username,
    expect.anything()
  );

  assertUserScores(scores.others);
});

describe("should display update picture modal", () => {
  it("and successfully call API", async () => {
    const user = userEvent.setup();

    updateUserPicture.mockImplementation((token, body, onSuccess) => {
      onSuccess();
    });

    const userData = getAuthenticatedUser("picture");

    renderWithProviders(<Account user={userData} />);

    const updatePictureButton = screen.getByTestId("update-picture-button");
    await user.click(updatePictureButton);
    // Checking that the update picture modal is displayed
    const updatePictureModal = screen.getByTestId("update-picture-modal");
    expect(updatePictureModal).toBeInTheDocument();
    // Uploading image file
    const modalBody = screen.getByTestId("update-file-input");
    const uploadFileInput = within(modalBody).getByPlaceholderText("");
    const file = new File(["python-test-image"], "python-test-image.jpg");
    await user.upload(uploadFileInput, file);
    // Submitting update picture form
    const updateButton =
      within(updatePictureModal).getByTestId("update-button");
    await user.click(updateButton);
    // Asserting that the update user picture endpoint was called
    expect(updateUserPicture).toHaveBeenCalledTimes(1);
    expect(updateUserPicture).toHaveBeenCalledWith(
      userData.token,
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
    // Asserting that no error occurred
    const errorToast = screen.queryByTestId("error-toast");
    expect(errorToast).not.toBeInTheDocument();
  });

  it("and display toast in case of error when calling API", async () => {
    const user = userEvent.setup();

    updateUserPicture.mockImplementation((token, body, onSuccess, onFail) => {
      onFail();
    });

    const userData = getAuthenticatedUser("picture");

    renderWithProviders(<Account user={userData} />);
    // Opening update picture modal
    const updatePictureButton = screen.getByTestId("update-picture-button");
    await user.click(updatePictureButton);
    // Uploading image file
    const modalBody = screen.getByTestId("update-file-input");
    const uploadFileInput = within(modalBody).getByPlaceholderText("");
    const file = new File(["python-test-image"], "python-test-image.jpg");
    await user.upload(uploadFileInput, file);
    // Submitting update picture form
    const updatePictureModal = screen.getByTestId("update-picture-modal");
    const updateButton =
      within(updatePictureModal).getByTestId("update-button");
    await user.click(updateButton);
    // Asserting that the update user picture endpoint was called
    expect(updateUserPicture).toHaveBeenCalledTimes(1);
    expect(updateUserPicture).toHaveBeenCalledWith(
      userData.token,
      expect.anything(),
      expect.anything(),
      expect.anything()
    );

    assertErrorToast(genericErrorMessage);
  });
});

describe("should display delete account modal", () => {
  it("and successfully call API", async () => {
    const user = userEvent.setup();

    deleteUser.mockImplementation((token, onSuccess) => {
      onSuccess();
    });

    const userData = getAuthenticatedUser("picture");

    renderWithProviders(<Account user={userData} />);
    // Opening delete account modal
    const deleteItem = screen.getByTestId("delete-item");
    await user.click(deleteItem);
    // Inputting confirmation text
    const modalBody = screen.getByTestId("confirm-delete-input");
    const confirmDeletionInput =
      within(modalBody).getByPlaceholderText("permanently delete");
    await user.type(confirmDeletionInput, "permanently delete");
    // Submitting the delete account form
    const deleteAccountModal = screen.getByTestId("delete-account-modal");
    const deleteButton =
      within(deleteAccountModal).getByTestId("delete-button");
    await user.click(deleteButton);
    // Assserting that the delete user endpoint was called
    expect(deleteUser).toHaveBeenCalledTimes(1);
    expect(deleteUser).toHaveBeenCalledWith(
      userData.token,
      expect.anything(),
      expect.anything()
    );
    // Asserting that no error occurred
    const errorToast = screen.queryByTestId("error-toast");
    expect(errorToast).not.toBeInTheDocument();
  });

  it("and should display toast when the deletion is not confirmed", async () => {
    const user = userEvent.setup();

    deleteUser.mockImplementation((token, onSuccess) => {
      onSuccess();
    });

    const userData = getAuthenticatedUser("picture");

    renderWithProviders(<Account user={userData} />);
    // Opening delete account modal
    const deleteItem = screen.getByTestId("delete-item");
    await user.click(deleteItem);
    // Inputting wrong confirmation text
    const modalBody = screen.getByTestId("confirm-delete-input");
    const confirmDeletionInput =
      within(modalBody).getByPlaceholderText("permanently delete");
    await user.type(confirmDeletionInput, "wrong text");
    // Submitting the delete account form
    const deleteAccountModal = screen.getByTestId("delete-account-modal");
    const deleteButton =
      within(deleteAccountModal).getByTestId("delete-button");
    await user.click(deleteButton);

    expect(deleteUser).toHaveBeenCalledTimes(0);
    assertErrorToast(errorDeletionConfirmationText);
  });

  it("and display toast in case of error when calling API", async () => {
    const user = userEvent.setup();

    deleteUser.mockImplementation((token, onSuccess, onFail) => {
      onFail();
    });

    const userData = getAuthenticatedUser("picture");

    renderWithProviders(<Account user={userData} />);
    // Opening delete account modal
    const deleteItem = screen.getByTestId("delete-item");
    await user.click(deleteItem);
    // Inputting confirmation text
    const modalBody = screen.getByTestId("confirm-delete-input");
    const confirmDeletionInput =
      within(modalBody).getByPlaceholderText("permanently delete");
    await user.type(confirmDeletionInput, "permanently delete");
    // Submitting the delete account form
    const deleteAccountModal = screen.getByTestId("delete-account-modal");
    const deleteButton =
      within(deleteAccountModal).getByTestId("delete-button");
    await user.click(deleteButton);
    // Assserting that the delete user endpoint was called
    expect(deleteUser).toHaveBeenCalledTimes(1);
    expect(deleteUser).toHaveBeenCalledWith(
      userData.token,
      expect.anything(),
      expect.anything()
    );

    assertErrorToast(genericErrorMessage);
  });
});
