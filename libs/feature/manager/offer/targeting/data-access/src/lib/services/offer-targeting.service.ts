import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import {
    BaseFindService,
    FindBrowserService,
    FindDeviceBrandsService,
    FindDeviceModelsService,
    FindLanguagesService,
    FindMobileOperatorsService,
    FindOperatingSystemsService
} from '@scaleo/shared/components/find';
import { GetFilterInterface, QueryHelper } from '@scaleo/shared/services/filters';

import {
    OfferTargetingDefaultItemsInterface,
    OfferTargetingDefaultMobileOperatorsInterface,
    OfferTargetingInterface,
    OfferTargetingLanguageItems
} from '../models/offer-targetig.model';

type RuleType = 'mobileOperators' | 'operatingSystems' | 'brands' | 'models' | 'browsers' | 'language';

@Injectable({
    providedIn: 'root'
})
export class OfferTargetingService {
    constructor(
        private rest: RestApiService,
        private translate: TranslateService,
        private findBrowserService: FindBrowserService,
        private mobileOperatorsService: FindMobileOperatorsService,
        private operatingSystemsService: FindOperatingSystemsService,
        private deviceBrandsService: FindDeviceBrandsService,
        private deviceModelsService: FindDeviceModelsService,
        private languagesService: FindLanguagesService
    ) {}

    private static params(search?: string): GetFilterInterface {
        return {
            page: 1,
            perPage: 20,
            search: search || '',
            sortDirection: 'asc'
        };
    }

    public view(id: number): Observable<OfferTargetingInterface> {
        const params = QueryHelper.filtersHttpParams({
            lang: this.translate.currentLang ? this.translate.currentLang : localStorage.getItem('scaleo__lang')
        });
        return this.rest
            .get<ApiResponse<OfferTargetingInterface>>('offer-targeting', {
                urlParameters: { id },
                request: {
                    params
                }
            })
            .pipe(
                pluck('info', 'targeting'),
                map((targeting: OfferTargetingInterface) => {
                    let includedSelected: any[] = targeting.gt_included_selected ? JSON.parse(targeting.gt_included_selected) : [];
                    let excludedSelected = targeting.gt_excluded_selected ? JSON.parse(targeting.gt_excluded_selected) : [];
                    const includedIds = targeting.gt_included_ids ? targeting.gt_included_ids.split(',').map((inc: any) => inc) : [];
                    const excludedIds = targeting.gt_excluded_ids ? targeting.gt_excluded_ids.split(',').map((inc: any) => inc) : [];

                    if (includedSelected.length > 0) {
                        includedSelected = includedSelected.map((c) => ({
                            ...c,
                            id: c.geoname_id,
                            title: c.geoname_title
                        }));
                    }

                    if (excludedSelected.length > 0) {
                        excludedSelected = excludedSelected.map((c: any) => ({
                            ...c,
                            id: c.geoname_id,
                            title: c.geoname_title
                        }));
                    }

                    return {
                        ...targeting,
                        gt_included_ids: includedIds,
                        gt_excluded_ids: excludedIds,
                        gt_included_selected: includedSelected,
                        gt_excluded_selected: excludedSelected
                    };
                })
            );
    }

    public update(id: number, post: OfferTargetingInterface): Observable<OfferTargetingInterface> {
        return this.rest.put<OfferTargetingInterface>('offer-targeting', post, {
            urlParameters: { id }
        });
    }

    public mobileOperators(search?: string): Observable<OfferTargetingDefaultMobileOperatorsInterface[]> {
        return this.ruleFactory('mobileOperators', search);
    }

    public operatingSystems(search?: string): Observable<OfferTargetingDefaultItemsInterface[]> {
        return this.ruleFactory('operatingSystems', search);
    }

    public brands(search?: string): Observable<OfferTargetingDefaultItemsInterface[]> {
        return this.ruleFactory('brands', search);
    }

    public models(search?: string): Observable<OfferTargetingDefaultItemsInterface[]> {
        return this.ruleFactory('models', search);
    }

    public browsers(search?: string): Observable<OfferTargetingDefaultItemsInterface[]> {
        return this.ruleFactory('browsers', search);
    }

    public language(search?: string): Observable<OfferTargetingLanguageItems[]> {
        return this.ruleFactory('language', search);
    }

    private ruleFactory<T>(rule: RuleType, search?: string): Observable<T> {
        const rules: { [key: string]: BaseFindService<T> } = {
            mobileOperators: this.mobileOperatorsService,
            operatingSystems: this.operatingSystemsService,
            brands: this.deviceBrandsService,
            models: this.deviceModelsService,
            browsers: this.findBrowserService,
            language: this.languagesService
        };

        const ruleService = rules[rule];

        if (!ruleService) {
            return EMPTY;
        }

        return ruleService.index(OfferTargetingService.params(search)).pipe(pluck('results'));
    }
}
