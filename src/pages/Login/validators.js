import { errorRequiredField } from "validators/validators";

export function getUsernameValidators() {
    return [
        {
            validate: function(target) {
                return !target.validity.valueMissing;
            },
            errorMessage: errorRequiredField
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
        }
    ];
}