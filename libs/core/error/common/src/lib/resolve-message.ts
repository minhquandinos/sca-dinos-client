import { ApiErrorModel } from '@scaleo/core/rest-api/service';

export class ResolveMessage {
    constructor(private _responseError: ApiErrorModel) {}

    get message(): string {
        return this._responseError?.message || 'Unknown error';
    }

    translate(): string {
        return undefined;
    }
}
