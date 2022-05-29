import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ReferralsService } from '@scaleo/affiliate/referral/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import { ManagerReferralDto, ManagerReferralModel } from './manager-referral.model';

@Injectable()
export class ManagerReferralService {
    constructor(
        private readonly referralsService: ReferralsService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService
    ) {}

    index<Q = BaseObjectModel>(queryParams: Q, affiliateId: number): Observable<ApiResponseWithPagination<ManagerReferralModel>> {
        return this.referralsService.index<ManagerReferralDto, ManagerReferralModel, Q>(queryParams, affiliateId).pipe(
            map(({ pagination, results }) => {
                const mapper = this.jsonConvertService.mapper<ManagerReferralModel>(ManagerReferralModel, results);
                return {
                    pagination,
                    results: mapper.map((referral: ManagerReferralModel) => ({
                        ...referral,
                        referral_commission_type: this.platformReferralSettingsService.referralCommissionsType,
                        referral_commission_currency: this.platformReferralSettingsService.referralCommissionCurrency
                    }))
                };
            }),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }
}
