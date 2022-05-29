import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';

import { PostbackListApi } from './postback-list.api';
import { AffiliatePostbackListModel, AffiliatePostbackListQueryParamsDto } from './postback-list.model';

@Injectable({
    providedIn: 'root'
})
export class PostbackListService {
    constructor(private api: PostbackListApi) {}

    index(queryParams: AffiliatePostbackListQueryParamsDto): Observable<ApiResponseWithPagination<AffiliatePostbackListModel>>;
    index(
        queryParams: AffiliatePostbackListQueryParamsDto,
        affiliateId: number
    ): Observable<ApiResponseWithPagination<AffiliatePostbackListModel>>;
    index(
        queryParams: AffiliatePostbackListQueryParamsDto,
        affiliateId?: number
    ): Observable<ApiResponseWithPagination<AffiliatePostbackListModel>> {
        return this.api.index(affiliateId, queryParams);
    }
}
