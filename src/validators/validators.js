export const errorRequiredField = "This field is required.";
export const errorEmailFormat = "Enter a valid email address.";
export const errorNotConfirmedPassword = "The passwords do not match.";
export const errorLetterPassword =
  "The password must have at least one letter.";
export const errorDigitPassword = "The password must have at least one digit.";
export const errorSpecialCharacterPassword =
  "The password must have at least one special character.";
export const errorLengthPassword =
  "The password must have a length between 8 and 30.";
export const errorInvalidUsername =
  "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.";
export const errorImageFileFormat =
  "Upload a valid image. The file you uploaded was either not an image or a corrupted image.";
export const errorTooShortUsername =
  "The username must be at least 8 characters-long.";
export const errorFileIsNotImage = "The selected file is not an image";
export const errorDeletionConfirmationText =
  'The text does not match "permanently delete".';
export const genericErrorMessage =
  "An error occurred when processing the request. Please try again.";

export class Validator {
  constructor(validate, errorMessage) {
    this.validate = validate;
    this.errorMessage = errorMessage;
  }
}

export function searchPattern(pattern, text) {
  return pattern.test(text);
}

export function isValidUsername(text) {
  return !searchPattern(/[^@.+-_0-9A-Za-z]/, text);
}

export function hasLetter(text) {
  return searchPattern(/[A-Z]/, text) || searchPattern(/[a-z]/, text);
}

export function hasDigit(text) {
  return searchPattern(/[0-9]/, text);
}

export function hasSpecialCharacter(text) {
  return searchPattern(/[!"#$%&'()*+,-./\\:;<=>[?@\]^_`{|}~]/, text);
}

export function isImageFile(target) {
  if (!target.files) {
    return true;
  }

  const { files } = target;

  if (files.length === 0) {
    return true;
  }

  const file = files[0];

  return file && file["type"].split("/")[0] === "image";
}
