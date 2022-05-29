import { TranslateService } from '@ngx-translate/core';

import { BaseObjectModel } from '@scaleo/core/data';

import { INTERPOLATION_KEY, VALIDATION_ERROR_MESSAGES, VALIDATION_ERROR_MESSAGES_TRANSLATE_MAP } from './translate-validation-errors.const';
import { TranslateValidationErrorsEnum } from './translate-validation-errors.enum';

export class TranslateError {
    constructor(private _message: string, private _translate: TranslateService) {}

    get translate(): string {
        const cortege = Object.entries(VALIDATION_ERROR_MESSAGES);
        const find = cortege.find(([, regexp]) => regexp.test(this._message));
        const key: TranslateValidationErrorsEnum = find?.[0] as TranslateValidationErrorsEnum;
        if (key) {
            return this._translate.instant(VALIDATION_ERROR_MESSAGES_TRANSLATE_MAP?.[key], { ...this._interpolation(key, this._message) });
        }
        return this._message;
    }

    private _interpolation(key: string, error: string): BaseObjectModel | undefined {
        const callback = INTERPOLATION_KEY?.[key];
        if (!callback) {
            return undefined;
        }
        return callback(error);
    }
}
