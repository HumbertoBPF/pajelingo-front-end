import { Validator, errorRequiredField } from "validators/validators";

export function getUsernameValidators() {
  return [
    new Validator((target) => !target.validity.valueMissing, errorRequiredField)
  ];
}

export function getPasswordValidators() {
  return [
    new Validator((target) => !target.validity.valueMissing, errorRequiredField)
  ];
}
