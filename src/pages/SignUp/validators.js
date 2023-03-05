import { errorDigitPassword, errorEmailFormat, errorInvalidUsername, errorLengthPassword, errorLetterPassword, errorNotConfirmedPassword, errorRequiredField, errorSpecialCharacterPassword, errorTooShortUsername, hasDigit, hasLetter, hasSpecialCharacter, isValidUsername } from "validators/validators";

export function getEmailValidators() {
    return [
        {
            validate: function(target) {
                return !target.validity.valueMissing;
            },
            errorMessage: errorRequiredField
        },
        {
            validate: function(target) {
                return !target.validity.typeMismatch;
            },
            errorMessage: errorEmailFormat
        }
    ];
}

export function getUsernameValidators() {
    return [
        {
            validate: function(target) {
                return !target.validity.valueMissing;
            },
            errorMessage: errorRequiredField
        },
        {
            validate: function(target) {
                const username = target.value;
                return isValidUsername(username);
            },
            errorMessage: errorInvalidUsername
        },
        {
            validate: function(target) {
                const username = target.value;
                return username.length >= 8;
            },
            errorMessage: errorTooShortUsername
        }
    ];
}

export function getPasswordValidators() {
    return [
        {
            validate: function(target) {
                return !target.validity.valueMissing;
            },
            errorMessage: errorRequiredField
        },
        {
            validate: function(target) {
                const password = target.value;
                return (password.length >= 8) && (password.length <= 30);
            },
            errorMessage: errorLengthPassword
        },
        {
            validate: function(target) {
                const password = target.value;
                return hasDigit(password);
            },
            errorMessage: errorDigitPassword
        },
        {
            validate: function(target) {
                const password = target.value;
                return hasLetter(password);
            },
            errorMessage: errorLetterPassword
        },
        {
            validate: function(target) {
                const password = target.value;
                return hasSpecialCharacter(password);
            },
            errorMessage: errorSpecialCharacterPassword
        }
    ];
}

export function getConfirmPasswordValidators(password) {
    return [
        {
            validate: function(target) {
                return !target.validity.valueMissing;
            },
            errorMessage: errorRequiredField
        },
        {
            validate: function(target) {
                return (password === target.value);
            },
            errorMessage: errorNotConfirmedPassword
        }
    ];
}