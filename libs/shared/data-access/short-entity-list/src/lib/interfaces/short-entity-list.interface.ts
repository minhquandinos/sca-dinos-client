import { Observable } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';

export interface ShortEntityListInterface<T = any> {
    list(...config: any[]): Observable<T> | Observable<ApiResponseWithPagination<T>>;
}
