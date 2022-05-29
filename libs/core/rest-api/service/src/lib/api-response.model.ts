import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';

import { BaseObjectModel } from '@scaleo/core/data';

export const API_RESPONSE_STATUS = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notfound: 404,
    validation: 422,
    internalServerError: 500,
    badGateway: 502,
    serverUnavailable: 503,
    serverTimeout: 504
} as const;

export type ApiResponseStatusType = typeof API_RESPONSE_STATUS;

export type ApiResponseStatusValuesType = ApiResponseStatusType[keyof ApiResponseStatusType];

export interface ApiResponse<T> extends HttpResponseBase {
    info: { [key: string]: Array<T> | T | any };
}

export interface ApiErrorModel<T = any> extends Pick<HttpErrorResponse, 'message'> {
    code: ApiResponseStatusValuesType | number;
    status: string | number;
    name: string;
    info?: BaseObjectModel<string, T>;
}
