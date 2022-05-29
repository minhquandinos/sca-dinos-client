import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { FilterInterface, QueryHelper } from '@scaleo/shared/services/filters';

import { PostbackInterface, PostbacksCountsInterface } from './postback.interface';

@Injectable({
    providedIn: 'root'
})
export class PostbacksService {
    constructor(private rest: RestApiService) {}

    public index(affiliateId: number, filters: FilterInterface): Observable<ApiResponseWithPagination<PostbackInterface>> {
        const params = QueryHelper.filtersHttpParams(filters);

        const options: RestApiOptions = {
            urlParameters: { affiliateId },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<PostbackInterface>>('postbacks-list', options)
            .pipe(map((response) => ResponseUtil.pagination<PostbackInterface>(response.headers, response.body.info.postbacks)));
    }

    public create(affiliateId: number, post: PostbackInterface): Observable<PostbackInterface> {
        return this.rest.post<PostbackInterface>('postback-create', post, { urlParameters: { affiliateId } });
    }

    public update(affiliateId: number, postbackId: number, post: PostbackInterface): Observable<PostbackInterface> {
        return this.rest.put<PostbackInterface>('postback-update', post, {
            urlParameters: { affiliateId, postbackId }
        });
    }

    public view(affiliateId: number, postbackId: number): Observable<PostbackInterface> {
        return this.rest
            .get<PostbackInterface>('postback-view', { urlParameters: { affiliateId, postbackId } })
            .pipe(map((response) => response['info']['postback']));
    }

    public delete(affiliateId: number, postbackId: number): Observable<any> {
        return this.rest.delete<any>('postback-delete', { urlParameters: { affiliateId, postbackId } });
    }

    counts(): Observable<PostbacksCountsInterface> {
        return this.rest.get<ApiResponse<PostbacksCountsInterface>>('postback-counts').pipe(map((response) => response.info.postbacks));
    }
}
