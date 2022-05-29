import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';

import {
    DomainListDto,
    DomainListModel,
    DomainListQueryParamsDto,
    DomainUpsertPayloadModel,
    DomainViewDto,
    DomainViewModel
} from './domain.model';

@Injectable()
export class DomainApi {
    constructor(
        private rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly planFeature: PlatformPlanFeatureType,
        private readonly checkPermissionService: CheckPermissionService,
        private readonly planFeatureService: PlanFeatureService
    ) {}

    index(id: number, queryParams: DomainListQueryParamsDto): Observable<ApiResponseWithPagination<DomainListModel[]>> {
        if (
            !this.planFeatureService.hasFeature(this.planFeature.domains) &&
            this.checkPermissionService.check(this.permissions.canAddEditDeleteDomains)
        ) {
            return EMPTY;
        }

        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            urlParameters: { id },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<DomainListDto[]>>('affiliate-domains', options).pipe(
            map(({ headers, body }) => {
                const mapper = this.jsonConvertService.mapper(DomainListModel, body?.info?.domains || []);
                return ResponseUtil.pagination(headers, mapper);
            })
        );
    }

    create(id: number, post: DomainUpsertPayloadModel): Observable<DomainViewModel> {
        return this.rest.post<ApiResponse<DomainViewDto>>('affiliate-domains', post, { urlParameters: { id } });
    }

    update(affiliateId: number, id: number, post: DomainUpsertPayloadModel): Observable<DomainViewModel> {
        return this.rest.put<ApiResponse<DomainViewDto>>('affiliate-domains-view', post, {
            urlParameters: { affiliateId, id }
        });
    }

    view(affiliateId: number, id: number): Observable<DomainViewModel> {
        return this.rest.get<ApiResponse<DomainViewDto>>('affiliate-domains-view', { urlParameters: { affiliateId, id } }).pipe(
            pluck('info', 'domain'),
            map((domain) => {
                return this.jsonConvertService.mapper(DomainViewModel, domain);
            })
        );
    }

    delete(affiliateId: number, id: number): Observable<void> {
        return this.rest.delete<void>('affiliate-domains-view', {
            urlParameters: { affiliateId, id }
        });
    }
}
