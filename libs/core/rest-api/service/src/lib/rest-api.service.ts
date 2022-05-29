import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { EndpointsService } from '@scaleo/platform/endpoints';

import { RequestData, RestApiOptions, RestApiRequestOptions } from './rest-api.model';

@Injectable()
export class RestApiService {
    constructor(private http: HttpClient, private endpointsService: EndpointsService) {}

    /* Public API*/
    public defaultHeaders: HttpHeaders = new HttpHeaders();

    public mock<T = BaseObjectModel[]>(mock: BaseObjectModel[]): Observable<T>;
    public mock<T = BaseObjectModel>(mock: BaseObjectModel): Observable<T>;
    public mock<T = any>(mock: string): Observable<T>;
    public mock<T = any>(mock: any): Observable<any> {
        if (Array.isArray(mock) || typeof mock === 'object') {
            return of(mock);
        }

        return this.http.get(mock).pipe(
            catchError((error) => this.handleError(error)),
            finalize(() => undefined)
        );
    }

    public get<T = any>(url: string, options: RestApiOptions = {}): Observable<any> {
        return this.getRequestByType({
            requestType: 'get',
            url,
            options
        });
    }

    public post<T = any>(url: string, body: any = null, options: RestApiOptions = {}): Observable<any> {
        return this.getRequestByType({
            requestType: 'post',
            url,
            body,
            options
        });
    }

    public put<T = any>(url: string, body: any = null, options: RestApiOptions = {}): Observable<any> {
        return this.getRequestByType({
            requestType: 'put',
            url,
            body,
            options
        });
    }

    public patch<T = any>(url: string, body: any = null, options: RestApiOptions = {}): Observable<any> {
        return this.getRequestByType({
            requestType: 'patch',
            url,
            body,
            options
        });
    }

    public delete<T = any>(url: string, options: RestApiOptions = {}): Observable<any> {
        return this.getRequestByType({
            requestType: 'delete',
            url,
            options
        });
    }

    /* Private API*/
    private getRequestByType(data: RequestData): Observable<any> {
        const currentUrl: string = this.resolveUrl(data?.url, data?.options.urlParameters);
        let request;

        if (!data?.options?.request) {
            data.options.request = {};
        }

        this.setDefaultHeaders(data.options.request);

        switch (data.requestType) {
            case 'get':
            case 'delete':
                request = this.http[data.requestType](currentUrl, data.options.request);
                break;

            case 'post':
            case 'put':
            case 'patch':
                request = this.http[data.requestType](currentUrl, data.body, data.options.request);
                break;
            default:
                break;
        }

        return request
            ? request.pipe(
                  catchError((error) => this.handleError(error)),
                  finalize(() => undefined)
              )
            : EMPTY;
    }

    private setDefaultHeaders(requestOptions: RestApiRequestOptions): void {
        const { defaultHeaders } = this;

        requestOptions.headers = requestOptions.headers ? requestOptions.headers : new HttpHeaders();

        defaultHeaders.keys().forEach((key: string) => {
            if (defaultHeaders.get(key)) {
                requestOptions.headers = requestOptions?.headers?.set(key, defaultHeaders.get(key) || '');
            }
        });
    }

    private resolveUrl(url: string = '', options?: { [key: string]: string }): string {
        const endpoint = this.endpointsService.endpoint(url);
        let path: string | undefined = undefined;

        if (endpoint) {
            path = endpoint;
        }

        if (endpoint && !path && !options) {
            return endpoint;
        }

        if (endpoint && !path) {
            path = endpoint;
        }

        if (endpoint === undefined) {
            throw new Error(`Please add endpoint: ${url} to endpoints object for current role`);
        }

        if (options) {
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const key in options) {
                path = path?.replace(`{${key}}`, options[key]);
            }
        }

        return path as string;
    }

    private handleError(error: Response): Observable<never> {
        return throwError(error);
    }

    appendEndPoints(endpoints: any): void {
        console.log('appendEndPoints', endpoints);
    }
}
