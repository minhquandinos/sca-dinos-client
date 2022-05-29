import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static email(control: FormControl): { [key: string]: boolean } {
        if (control && control.value) {
            const email = control.value;
            const pattern = /^([a-zA-Zа-яА-ЯЁё0-9+_-]+)(\.[a-zA-Zа-яА-ЯЁё0-9+_-]+)*@([a-zA-Zа-яА-ЯЁё0-9-]+\.)+[a-zA-Zа-яА-ЯЁё]{2,15}$/gi;
            const match = email.match(pattern);
            if (!match) {
                return { email: true };
            }
        }
        return null;
    }

    static checkPassword(): ValidatorFn {
        return checkPassword();
    }

    static checkRepeatPassword(): ValidatorFn {
        return checkRepeatPassword();
    }

    static checkUrl(): ValidatorFn {
        return checkUrl();
    }

    static checkCustomFieldName(control: FormControl): { [key: string]: boolean } {
        if (control && control.value) {
            const pattern = /^[a-zA-Z_0-9]+$/;

            if (!pattern.test(control.value)) {
                return { custom_field_name: true };
            }
        }

        return null;
    }

    static requiredTrueForCheckbox(): ValidatorFn {
        return requiredTrueForCheckbox();
    }

    static positiveNumber(control: FormControl): ValidatorFn | any {
        if (control && control.value) {
            const pattern = /^[0-9]+$/;
            if (!pattern.test(control.value) && control.value < 0) {
                return { custom_positive_number: true };
            }
        }

        return null;
    }

    static domain(control: FormControl): ValidatorFn | any {
        if (control && control.value) {
            const pattern = /^(?!.* .*)(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
            if (!pattern.test(control.value)) {
                return { custom_domain: true };
            }
        }

        return null;
    }
}

export function checkRepeatPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control?.get('password')?.value && control?.get('password_repeat')?.value) {
            const password = control.get('password').value; // to get value in input tag
            const confirmPassword = control.get('password_repeat').value; // to get value in input tag
            if (password !== confirmPassword) {
                control.get('password_repeat').setErrors({ passwordRepeat: true });
            } else {
                control.get('password_repeat').setErrors(null);
            }
        }
        return null;
    };
}

export function checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.get('password')?.value) {
            if (control.get('password').value !== control.get('password_repeat').value) {
                return { passwordRepeat: true };
            }
        }
        return null;
    };
}

export function requiredTrueForCheckbox(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
        if (control) {
            if (control.value !== 1) {
                return { required: true };
            }
        }
        return null;
    };
}

export function checkUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control?.value) {
            const pattern = '(https?://)(www.)?[a-zа-я0-9.-]+\\.([a-zа-я]{2,6})[/\\\\w .-]*/?';
            const match = control.value.match(pattern);
            if (!match) {
                return { custom_url: true };
            }
        }
        return null;
    };
}

export function minMaxValidation(min?: number | string, max?: number | string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        const value = +control.value;
        if (control && (!Number.isNaN(+min) || !Number.isNaN(+max))) {
            if (value < min || value > max || Number.isNaN(value)) {
                return { incorrect_amount: true };
            }
        }
        return null;
    };
}

export function requiredFileType(types: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
        const file = control.value;
        if (file && file.name) {
            const extension = file.name.split('.').pop().toLowerCase();
            const typesArr = types.split(',').map((type) => type.toLowerCase());
            if (!typesArr.includes(extension.toLowerCase())) {
                return {
                    required_file_type: true
                };
            }

            return null;
        }

        return null;
    };
}

// TODO use FileSizeFormat class
export function maxUploadSizeValidation(availableSize: number, sizeFormat: 'KB' | 'MB' | 'GB' = 'MB') {
    return (control: FormControl): { [key: string]: boolean | number | string } => {
        const file = control.value;
        if (file) {
            let uploadFileSize;

            let sizeFormatName;

            switch (sizeFormat) {
                case 'GB':
                    sizeFormatName = 'GB';
                    uploadFileSize = file.size / (1024 * 1024 * 1024);
                    break;
                case 'KB':
                    sizeFormatName = 'KB';
                    uploadFileSize = file.size / 1024;
                    break;
                default:
                    sizeFormatName = 'MB';
                    uploadFileSize = file.size / (1024 * 1024);
                    break;
            }

            if (!(uploadFileSize <= availableSize)) {
                return {
                    max_upload_size: true,
                    availableSize: `${availableSize.toFixed(0)} ${sizeFormatName}`,
                    uploadFileSize: `${uploadFileSize.toFixed(0)} ${sizeFormatName}`
                };
            }

            return null;
        }

        return null;
    };
}

export function maxCountRecordPerLine(count: number, regex: RegExp = /[\n\r| ]/g) {
    return (control: FormControl): { max_count_record: boolean; maxCount: number } => {
        const text = control.value;
        if (text) {
            const textArr = text.toString().split(regex);

            if (textArr.length > count) {
                return {
                    max_count_record: true,
                    maxCount: count
                };
            }

            return null;
        }

        return null;
    };
}

/**
 * @param characters string | string[]
 * @param translateKey string = 'default' it is last variable of translate schema, full path to translate interface.validation.forbidden_characters.default
 */
export function forbiddenCharacters(characters: string | string[], translateKey: string = 'default'): ValidatorFn {
    return (control: AbstractControl): { forbidden_characters: boolean; translateKey: string } => {
        const text = control.value;
        if (text) {
            const validation = typeof characters === 'string' ? [characters] : characters;

            const test = validation.some((elem) => {
                const regexp = new RegExp(elem);
                return regexp.test(text);
            });

            if (test) {
                return {
                    forbidden_characters: true,
                    translateKey
                };
            }

            return null;
        }

        return null;
    };
}
