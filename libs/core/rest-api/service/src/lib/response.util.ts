import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApiPaginationModel, ApiResponseWithPagination } from './apiPaginationModel';

export class ResponseUtil {
    static setPagination(headers: HttpHeaders): ApiPaginationModel {
        if (headers?.keys()) {
            return {
                current_page: Number(headers.get('x-pagination-current-page')),
                page_count: Number(headers.get('x-pagination-page-count')),
                per_page: Number(headers.get('x-pagination-per-page')),
                total_count: Number(headers.get('x-pagination-total-count'))
            };
        }
        return undefined;
    }

    static pagination<T>(headers: any, results: T | any): ApiResponseWithPagination<T> {
        return {
            pagination: ResponseUtil.setPagination(headers),
            results
        };
    }

    static prepare<T>(response: HttpResponse<T>, infoKey?: string): ApiResponseWithPagination<T> {
        const { headers = undefined, body = undefined } = response || {};
        const { info = undefined } = (body as any) || {};
        const pagination = headers ? ResponseUtil.setPagination(headers) : undefined;
        const infoObj = new Map(Object.entries(info));
        let results: T[] = [];

        if (infoKey) {
            results = infoObj.get(infoKey) as T[];
        } else {
            const [first] = infoObj.values();
            results = first as T[];
        }

        return {
            pagination,
            results
        };
    }
}
