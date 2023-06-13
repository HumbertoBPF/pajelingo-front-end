import { Validator, errorDeletionConfirmationText, errorFileIsNotImage, isImageFile } from "validators/validators";

export function getImageFileValidators() {
    return [
        new Validator((target) => isImageFile(target), errorFileIsNotImage)
    ];
}

export function getConfirmDeletionInputValidation() {
    return [
        new Validator((target) => target.value === "permanently delete", errorDeletionConfirmationText)
    ];
}