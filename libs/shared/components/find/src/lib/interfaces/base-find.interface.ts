import { Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';

export interface BaseFindInterface<T> {
    // new (reset: RestApiService): void;
    index(filters: BaseObjectModel): Observable<ApiResponseWithPagination<T[]>>;
}
