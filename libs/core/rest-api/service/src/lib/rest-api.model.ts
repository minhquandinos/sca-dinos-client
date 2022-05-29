import { HttpHeaders, HttpParams } from '@angular/common/http';

export class RestApiDefaultHeaders {
    [key: string]: string;
}

export class RestApiUrlParameters {
    [key: string]: any;
}

export class RestApiRequestOptions {
    headers?: HttpHeaders;

    observe?: any = 'body';

    params?: HttpParams;

    reportProgress?: boolean;

    responseType?: any = 'json';

    withCredentials?: boolean;
}

export class RestApiOptions {
    urlParameters?: RestApiUrlParameters;

    request?: RestApiRequestOptions;
}

export class RequestData {
    requestType?: string;

    url?: string;

    body?: any;

    options: RestApiOptions;
}
