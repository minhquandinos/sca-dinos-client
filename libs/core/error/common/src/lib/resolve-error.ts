import { BaseObjectModel } from '@scaleo/core/data';
import { ApiErrorModel } from '@scaleo/core/rest-api/service';

import { ResolveMessage } from './resolve-message';
import { ResolveValidation } from './resolve-validation';

export class ResolveError {
    private readonly _validation: ResolveValidation;

    private readonly _message: ResolveMessage;

    constructor(private _responseError: ApiErrorModel) {
        this._validation = new ResolveValidation(this._responseError);
        this._message = new ResolveMessage(this._responseError);
    }

    get firstValidation(): string | undefined {
        return this._validation.firstValidation;
    }

    get message(): string {
        return this._message?.message;
    }

    private get _validations(): BaseObjectModel<string, string[]> {
        return this._validation.validations;
    }
}
