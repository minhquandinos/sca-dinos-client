import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ReferralQueryParamsDto, ReferralsService } from '@scaleo/affiliate/referral/data-access';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { ManagerReferralModel } from '@scaleo/feature/manager/affiliate/referral/data-access';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';

import { AffiliateAccessReferralDto, AffiliateAccessReferralModel } from '../affiliate-access-referral.model';

@Injectable()
export class AffiliateAccessReferralListApi {
    constructor(
        private readonly referralsService: ReferralsService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService
    ) {}

    index(queryParams: ReferralQueryParamsDto): Observable<ApiResponseWithPagination<AffiliateAccessReferralModel>> {
        return this.referralsService
            .index<AffiliateAccessReferralDto, AffiliateAccessReferralModel, ReferralQueryParamsDto>(queryParams)
            .pipe(
                map(({ pagination, results }) => {
                    const newResults = this.jsonConvertService.mapper(AffiliateAccessReferralModel, results);
                    return {
                        pagination,
                        results: newResults.map((referral: ManagerReferralModel) => ({
                            ...referral,
                            referral_commission_type: this.platformReferralSettingsService.referralCommissionsType,
                            referral_commission_currency: this.platformReferralSettingsService.referralCommissionCurrency
                        }))
                    };
                })
            );
    }
}
