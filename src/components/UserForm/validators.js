import { Validator, errorDigitPassword, errorEmailFormat, errorInvalidUsername, errorLengthPassword, errorLetterPassword, errorNotConfirmedPassword, errorRequiredField, errorSpecialCharacterPassword, errorTooShortUsername, hasDigit, hasLetter, hasSpecialCharacter, isValidUsername } from "validators/validators";

export function getEmailValidators() {
    return [
        new Validator((target) => !target.validity.valueMissing, errorRequiredField),
        new Validator((target) => !target.validity.typeMismatch, errorEmailFormat)
    ];
}

export function getUsernameValidators() {
    return [
        new Validator((target) => !target.validity.valueMissing, errorRequiredField),
        new Validator((target) => isValidUsername(target.value), errorInvalidUsername),
        new Validator((target) => target.value.length >= 8, errorTooShortUsername)
    ];
}

export function getPasswordValidators() {
    return [
        new Validator((target) => !target.validity.valueMissing, errorRequiredField),
        new Validator((target) => (target.value.length >= 8) && (target.value.length <= 30), errorLengthPassword),
        new Validator((target) => hasDigit(target.value), errorDigitPassword),
        new Validator((target) => hasLetter(target.value), errorLetterPassword),
        new Validator((target) => hasSpecialCharacter(target.value), errorSpecialCharacterPassword)
    ];
}

export function getConfirmPasswordValidators(password) {
    return [
        new Validator((target) => !target.validity.valueMissing, errorRequiredField),
        new Validator((target) => (password === target.value), errorNotConfirmedPassword)
    ];
}