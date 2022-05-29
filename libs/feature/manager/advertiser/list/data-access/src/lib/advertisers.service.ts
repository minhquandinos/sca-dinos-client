import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { ShortAdvertiserModel } from '@scaleo/shared/data-access/short-entity-list';
import { Filter2Interface, FilterInterface, QueryHelper } from '@scaleo/shared/services/filters';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

import { AdvertiserListModel } from './advertiser-list.model';

@Injectable({ providedIn: 'root' })
export class AdvertisersService {
    // private url = `${this.env.serverUrl}/advertisers`;
    //
    // constructor(
    //     private http: HttpClient,
    //     private shared: SharedMethodsService,
    //     private translate: TranslateService,
    //     private env: EnvService,
    //     private platformSettingsQuery: PlatformSettingsQuery,
    //     private jsonConvertService: JsonConvertService,
    //     private rest: RestApiService,
    //     private platformListsService: PlatformListsService,
    //     private readonly pathFile: PathFileService
    // ) {}
    //
    // public list(filters?: Filter2Interface): Observable<ApiResponseWithPagination<AdvertiserListModel[]>> {
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
    //         this.rest.get<ApiResponse<AdvertisersModel[]>>('advertisers-list', options),
    //         this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))
    //     ]).pipe(
    //         map(([response, messengers]) => {
    //             const data = response.body.info.advertisers.map((obj) => {
    //                 const contacts = new ContactAdapter(obj?.contacts, messengers);
    //                 return {
    //                     ...obj,
    //                     image: this.pathFile.platformImage(obj.image, 'advertisers'),
    //                     contacts: contacts.transform(),
    //                     managers_assigned: obj.managers_assigned
    //                         ? JSON.parse(obj.managers_assigned).map((manager) => ({
    //                               ...manager,
    //                               image: this.pathFile.platformImage(manager.image)
    //                           }))
    //                         : []
    //                 };
    //             });
    //             const advertisers = this.jsonConvertService.mapperArray<AdvertisersModel>(data, AdvertisersModel);
    //
    //             return ResponseUtil.pagination<AdvertisersModel[]>(response.headers, advertisers);
    //         })
    //     );
    // }
    //
    // public listSimple(filter?: FilterInterface): Observable<ApiResponseWithPagination<ShortAdvertiserModel[]>> {
    //     const params = QueryHelper.filtersHttpParams(filter);
    //
    //     const options: RestApiOptions = {
    //         request: {
    //             params,
    //             observe: 'response'
    //         }
    //     };
    //
    //     return this.rest
    //         .get<ApiResponse<ShortAdvertiserModel[]>>('advertiser-get-filter-info', options)
    //         .pipe(map((response) => ResponseUtil.pagination<ShortAdvertiserModel[]>(response.headers, response.body.info.advertisers)));
    // }
    //
    // public detailSimple(id: number): Observable<ShortAdvertiserModel> {
    //     return this.rest
    //         .get<ShortAdvertiserModel>('advertiser-view', { urlParameters: { id } })
    //         .pipe(map((response) => response['info']['advertiser']));
    // }
    //
    // detail(id: number): Observable<AdvertiserListModel> {
    //     const params = QueryHelper.filtersHttpParams({ lang: this.translate.currentLang });
    //
    //     return forkJoin([
    //         this.rest.get<ApiResponse<AdvertiserListModel>>('advertiser', {
    //             urlParameters: { id },
    //             request: {
    //                 params
    //             }
    //         }),
    //         this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))
    //     ]).pipe(
    //         map(([response, messengers]) => {
    //             const data = response.info.advertiser;
    //
    //             const country = data.country_selected ? JSON.parse(data.country_selected) : '';
    //             if (country) {
    //                 country.id = Number(country.id);
    //                 country.image = this.pathFile.countryIcon(country.country_code.toLowerCase());
    //             }
    //
    //             const customFields = this.platformSettingsQuery.settings.adv_custom_fields;
    //
    //             const contacts = new ContactAdapter(data.contacts, messengers);
    //
    //             return {
    //                 ...data,
    //                 contacts: contacts.transform(),
    //                 country: data.country !== 0 ? data.country : null,
    //                 country_selected: country,
    //                 managers_assigned: data.managers_assigned
    //                     ? JSON.parse(data.managers_assigned).map((manager) => ({
    //                           ...manager,
    //                           image: this.pathFile.platformImage(manager.image)
    //                       }))
    //                     : [],
    //                 image: this.pathFile.platformImage(data.image, 'advertisers'),
    //                 registration: data.registration ? JSON.parse(data.registration) : '',
    //                 tags_selected: data.tags_selected ? JSON.parse(data.tags_selected) : null,
    //                 custom_fields: data.custom_fields && customFields.length > 0 ? JSON.parse(data.custom_fields) : ''
    //             };
    //         })
    //     );
    // }
}
