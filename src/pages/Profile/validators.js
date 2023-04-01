import { errorFileIsNotImage } from "validators/validators";

export function getImageFileValidators() {
    return [
        {
            validate: function(target) {
                if (!target.files) {
                    return true;
                }
                
                const file = target.files[0];

                return file && file['type'].split('/')[0] === 'image';
            },
            errorMessage: errorFileIsNotImage
        }
    ];
}