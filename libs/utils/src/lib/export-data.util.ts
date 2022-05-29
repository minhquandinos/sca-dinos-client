import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService, RestApiUrlParameters } from '@scaleo/core/rest-api/service';

import { fileUtil } from './file.util';

export const exportDataUtil = (
    rest: RestApiService,
    url: string,
    config?: {
        params?: HttpParams;
        urlParameters?: RestApiUrlParameters;
    }
): Observable<HttpResponse<ArrayBuffer>> => {
    const options: RestApiOptions = {
        urlParameters: config?.urlParameters,
        request: {
            params: config?.params,
            observe: 'response',
            responseType: 'arrayBuffer'
        }
    };

    return rest.get<ApiResponse<HttpResponse<ArrayBuffer>>>(url, options).pipe(
        tap((response) => {
            fileUtil.createFile(response);
        })
    );
};
