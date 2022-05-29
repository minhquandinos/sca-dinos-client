import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationMethods {
    // public serverValidationTranslate(error, param = null): string {
    //     let translateSchema = '';
    //     let translateSchemaParams = {};
    //     let errorMatch = error;
    //
    //     if (/has already been taken/.test(error)) {
    //         errorMatch = 'email_alredy_taken';
    //     }
    //
    //     if (/Goal ID \d+ has already been taken./.test(error.replace(/"|\\/g, ''))) {
    //         errorMatch = 'goal_id_already_taken';
    //     }
    //
    //     // TODO refactor this method
    //     switch (errorMatch) {
    //         case 'Email cannot be blank.':
    //             translateSchema = 'server_validation.blank_email';
    //             break;
    //         case 'Incorrect email or password.':
    //             translateSchema = 'server_validation.incorrect_email';
    //             break;
    //         case 'Password cannot be blank.':
    //             translateSchema = 'server_validation.blank_password';
    //             break;
    //         case 'User not found':
    //             translateSchema = 'server_validation.no_user';
    //             break;
    //         case 'Email is not a valid email address.':
    //             translateSchema = 'server_validation.valid_email';
    //             break;
    //         case 'email_alredy_taken':
    //             translateSchema = 'server_validation.email_alredy_taken';
    //             const email = ValidationMethods.extractEmails(error)?.[0];
    //             translateSchemaParams = { email };
    //             break;
    //         case 'goal_id_already_taken':
    //             const goalId = error.match(/\d+/g)?.[0];
    //             translateSchema = 'server_validation.goal_id_already_taken';
    //             translateSchemaParams = { goalId };
    //             break;
    //         case 'Account is pending approval':
    //             translateSchema = 'server_validation.account_is_pending_approval';
    //             break;
    //         default:
    //             translateSchema = '';
    //             break;
    //     }
    //
    //     return translateSchema ? this.translate.instant(translateSchema, translateSchemaParams) : error;
    // }

    // private static extractEmails(text) {
    //     return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    // }

    // public invalidField(field: string, form: FormGroup, index, formArrayFieldName, formGroupFieldName): boolean {
    //     let isValid = form.get(field).touched && form.get(field).invalid;
    //
    //     if (index !== null && formArrayFieldName !== null) {
    //         const childControl = ValidationMethods.getChildControl(field, form, formArrayFieldName, index);
    //         isValid = childControl.invalid && childControl.touched;
    //     }
    //     if (formGroupFieldName !== null) {
    //         const groupControl = ValidationMethods.getGroupControl(field, form, formGroupFieldName);
    //         isValid = groupControl.invalid && groupControl.touched;
    //     }
    //
    //     return isValid;
    // }

    private static getChildControl(field: any, form: FormGroup, formArrayFieldName: string, index: number) {
        const check = (form.get(formArrayFieldName) as FormArray).controls[index];
        return (check as FormArray).controls[field];
    }

    private static getGroupControl(field: any, form: FormGroup, formGroupFieldName: string) {
        return (form.get(formGroupFieldName) as FormArray).controls[field];
    }

    public validationType(field: string, form: FormGroup, formArrayFieldName: string, formGroupFieldName: string, index: number): any {
        if (index !== null && formArrayFieldName !== null) {
            const childControl = ValidationMethods.getChildControl(field, form, formArrayFieldName, index);
            return Object.keys(childControl.errors)[0];
        }
        if (formGroupFieldName !== null) {
            const groupControl = ValidationMethods.getGroupControl(field, form, formGroupFieldName);
            return Object.keys(groupControl.errors)[0];
        }

        return Object.keys(form.get(field).errors)[0];
    }

    // TODO change for formGroup.markAllAsTouched();
    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            } else if (control instanceof FormArray) {
                const arrControls = (control as FormArray).controls;
                // eslint-disable-next-line
                Object.keys(arrControls).forEach((field: any) => {
                    // eslint-disable-next-line
                    Object.keys((arrControls[field] as any).controls).forEach((field2) => {
                        // eslint-disable-next-line
                        const control2 = (arrControls[field] as any).controls[field2];
                        control2.markAsTouched({ onlySelf: true });
                    });
                });
            }
        });

        const form = document.querySelector('form .ng-invalid');
        if (form) {
            form.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }
}
