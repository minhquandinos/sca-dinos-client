import { BaseObjectModel } from '@scaleo/core/data';
import { API_RESPONSE_STATUS, ApiErrorModel } from '@scaleo/core/rest-api/service';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

export class ResolveValidation {
    constructor(private _responseError: ApiErrorModel) {}

    get firstValidation(): string | undefined {
        if (this._isValidation) {
            return this._firstValidation;
        }
        return undefined;
    }

    get validations(): BaseObjectModel<string, string[]> | undefined {
        if (this._isValidation) {
            return this._responseError?.info?.['errors'];
        }

        return undefined;
    }

    translateFirstValidation(): string {
        return undefined;
    }

    private get _firstValidation(): string | undefined {
        const firstError = objectUtil.first(this.validations);
        const [firstKey] = Object.keys(firstError);
        const error = ArrayUtil.first(firstError[firstKey]);
        return error;
    }

    private get _isValidation(): boolean {
        return [this._responseError.status, this._responseError.code].includes(API_RESPONSE_STATUS.validation);
    }
}
