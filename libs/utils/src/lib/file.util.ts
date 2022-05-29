import { HttpParams, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService, RestApiUrlParameters } from '@scaleo/core/rest-api/service';

export const fileUtil = ((): any => {
    const createFile = (response: HttpResponse<any>): void => {
        const { headers, body } = response;

        const contentDisposition = headers.get('content-disposition');

        if (contentDisposition) {
            const contentType = headers.get('content-type');
            const filename = contentDisposition.match(/filename="(.+)"/)[1];

            const file = new Blob([body], { type: contentType });

            saveAs(file, filename);
        }
    };

    const exportFile = (
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
                createFile(response);
            })
        );
    };

    return {
        createFile,
        exportFile
    };
})();
