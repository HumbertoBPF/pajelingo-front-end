import { errorDeletionConfirmationText, errorFileIsNotImage, isImageFile } from "validators/validators";

export function getImageFileValidators() {
    return [
        {
            validate: function(target) {
                return isImageFile(target);
            },
            errorMessage: errorFileIsNotImage
        }
    ];
}

export function getConfirmDeletionInputValidation() {
    return [
        {
            validate: function(target) {
                return target.value === "permanently delete";
            },
            errorMessage: errorDeletionConfirmationText
        }
    ];
}