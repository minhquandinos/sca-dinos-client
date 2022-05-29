import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { DateFormatService } from '@scaleo/platform/format/service';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { FilterInterface, QueryHelper } from '@scaleo/shared/services/filters';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { AffiliateDetailStore } from '../../../../detail/data-access/src/lib/affiliate-detail.store';
import {
    AffiliateCountsInterface,
    AffiliateInterface,
    ShortAffiliateInterface,
    SponsorsInterface,
    SponsorsParamsInterface
} from './affiliate.interface';

// TODO refactor this service, concat with AffiliateListService
@Injectable({ providedIn: 'root' })
export class AffiliateService {
    constructor(
        private translate: TranslateService,
        private readonly pathFileService: PathFileService,
        private env: EnvService,
        private platformSettingsQuery: PlatformSettingsQuery,
        private rest: RestApiService,
        private jsonConvertService: JsonConvertService,
        private platformListsService: PlatformListsService,
        private affiliateProfileStore: AffiliateDetailStore,
        private dateFormatService: DateFormatService
    ) {}

    // public list(filters?: Filter2Interface): Observable<ApiResponseWithPagination<AffiliatesModel[]>> {
    //     const params = QueryHelper.filtersHttpParams({
    //         ...filters.params,
    //         lang: this.translate.currentLang || localStorage.getItem('scaleo__lang')
    //     });
    //
    //     const options = {
    //         request: {
    //             params,
    //             observe: 'response'
    //         }
    //     };
    //     return forkJoin([
    //         this.rest.get<ApiResponse<AffiliatesModel[]>>('affiliate-list', options),
    //         this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))
    //     ]).pipe(
    //         map(([response, messengers]) => {
    //             const data = response.body.info.affiliates.map((obj) => {
    //                 const contacts = new ContactAdapter(obj?.contacts, messengers);
    //                 return {
    //                     ...obj,
    //                     image: this.pathFileService.platformImage(obj.image, 'affiliates'),
    //                     contacts: contacts.transform(),
    //                     managers_assigned: obj.managers_assigned
    //                         ? JSON.parse(obj.managers_assigned).map((manager) => ({
    //                               ...manager,
    //                               image: this.pathFileService.platformImage(manager.image)
    //                           }))
    //                         : []
    //                 };
    //             });
    //
    //             const affiliates = this.jsonConvertService.mapperArray<AffiliatesModel>(data, AffiliatesModel);
    //             return ResponseUtil.pagination<AffiliateInterface[]>(response.headers, affiliates);
    //         })
    //     );
    // }

    // TODO clear this method after backend return correct response
    // public affiliateDetails(id: number): Observable<AffiliateInterface> {
    //     const params = QueryHelper.filtersHttpParams({ lang: this.translate.currentLang });
    //     return forkJoin([
    //         this.rest
    //             .get<ApiResponse<AffiliateInterface>>('affiliate-view', {
    //                 urlParameters: { id },
    //                 request: { params }
    //             })
    //             .pipe(pluck('info', 'affiliate')),
    //         this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))
    //     ]).pipe(
    //         map(([affiliate, messengers]) => {
    //             const contacts = new ContactAdapter(affiliate.contacts, messengers);
    //
    //             affiliate.country_selected = Util.jsonParse(affiliate.country_selected, null);
    //             affiliate.tags_selected = Util.jsonParse(affiliate.tags_selected, null);
    //             affiliate.contacts = contacts.transform();
    //             affiliate.image = this.pathFileService.platformImage(affiliate.image, 'affiliates');
    //             affiliate.registration = Util.jsonParse(affiliate.registration, null);
    //             affiliate.visited_info = Util.jsonParse(affiliate.visited_info, null);
    //             affiliate.traffic_types_selected = Util.jsonParse(affiliate.traffic_types_selected, null);
    //             affiliate.referrals_info = Util.jsonParse(affiliate.referrals_info, null);
    //             affiliate.referral_sponsor_info = Util.jsonParse(affiliate.referral_sponsor_info, null);
    //             affiliate.managers_assigned = affiliate.managers_assigned
    //                 ? JSON.parse(affiliate.managers_assigned).map((manager) => ({
    //                       ...manager,
    //                       image: this.pathFileService.platformImage(manager.image)
    //                   }))
    //                 : [];
    //
    //             const customFields = Util.jsonParse(this.platformSettingsQuery.settings.aff_custom_fields, []);
    //             affiliate.custom_fields =
    //                 affiliate?.custom_fields && customFields?.length > 0 ? Util.jsonParse(affiliate.custom_fields) : '';
    //
    //             return affiliate;
    //         }),
    //         tap((affiliate) => {
    //             const address = [];
    //             address.push(
    //                 affiliate?.address,
    //                 affiliate?.city,
    //                 affiliate?.region,
    //                 affiliate?.country_selected?.title,
    //                 affiliate?.postal_code
    //             );
    //
    //             affiliate.created = this.dateFormatService.format(+affiliate.created);
    //             affiliate.visited = this.dateFormatService.format(+affiliate.visited);
    //             affiliate.activity = this.dateFormatService.format(+affiliate.activity);
    //
    //             this.affiliateProfileStore.update({
    //                 detail: {
    //                     ...affiliate,
    //                     address: address.filter((el) => el).join(', ')
    //                 }
    //             });
    //         })
    //     );
    // }

    public create(post: AffiliateInterface): Observable<AffiliateInterface> {
        return this.rest.post<AffiliateInterface>('affiliate-create', post);
    }

    public update(id: number, post: AffiliateInterface): Observable<AffiliateInterface> {
        return this.rest.put<AffiliateInterface>('affiliate-update', post, { urlParameters: { id } });
    }

    public delete(id: number): Observable<void> {
        return this.rest.delete<void>('affiliate-delete', { urlParameters: { id } });
    }

    public deleteImage(id: number): Observable<any> {
        return this.rest.delete<any>('affiliate-delete-image', { urlParameters: { id } });
    }

    searchSponsors(filters: SponsorsParamsInterface): Observable<ApiResponseWithPagination<SponsorsInterface[]>> {
        const params = QueryHelper.filtersHttpParams(filters);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<SponsorsInterface[]>>('affiliate-get-sponsor', options)
            .pipe(map((response) => ResponseUtil.pagination<AffiliateInterface[]>(response.headers, response.body.info.sponsors)));
    }

    public affiliateCounts(id: number): Observable<AffiliateCountsInterface> {
        return this.rest.get<AffiliateCountsInterface>('affiliate-get-counts', { urlParameters: { id } }).pipe(pluck('info', 'affiliate'));
    }

    public detailSimple(id: number): Observable<ShortAffiliateInterface> {
        return this.rest
            .get<ShortAffiliateInterface>('affiliate-get-filter-info-by-id', { urlParameters: { id } })
            .pipe(pluck('info', 'affiliate'));
    }

    public listSimple(filters?: FilterInterface): Observable<ApiResponseWithPagination<ShortAffiliateInterface[]>> {
        const params = QueryHelper.filtersHttpParams(filters);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<ShortAffiliateInterface[]>>('affiliate-get-filter-info', options)
            .pipe(map((response) => ResponseUtil.pagination<AffiliateInterface[]>(response.headers, response.body.info.affiliates)));
    }
}
