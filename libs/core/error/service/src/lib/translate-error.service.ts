import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseObjectModel } from '@scaleo/core/data';

import {
    INTERPOLATION_KEY,
    VALIDATION_ERROR_MESSAGES,
    VALIDATION_ERROR_MESSAGES_TRANSLATE_MAP
} from '../../../common/src/lib/translate-validation-errors.const';
import { TranslateValidationErrorsEnum } from '../../../common/src/lib/translate-validation-errors.enum';

@Injectable({
    providedIn: 'root'
})
export class TranslateErrorService {
    constructor(private readonly _translate: TranslateService) {}

    private static _interpolation(key: string, error: string): BaseObjectModel | undefined {
        const callback = INTERPOLATION_KEY?.[key];
        if (!callback) {
            return undefined;
        }
        return callback(error);
    }

    translate(errorMessage: string): string | undefined {
        const cortege = Object.entries(VALIDATION_ERROR_MESSAGES);
        const find = cortege.find(([, regexp]) => regexp.test(errorMessage));
        const key: TranslateValidationErrorsEnum = find?.[0] as TranslateValidationErrorsEnum;
        if (key) {
            return this._translate.instant(VALIDATION_ERROR_MESSAGES_TRANSLATE_MAP?.[key], {
                ...TranslateErrorService._interpolation(key, errorMessage)
            });
        }
        return errorMessage;
    }

    customTranslate(translate: string): string {
        return this._translate.instant(translate);
    }
}
