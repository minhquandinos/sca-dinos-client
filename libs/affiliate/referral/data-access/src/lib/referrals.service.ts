import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { referralCommissions } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';

import { ReferralApi } from './referral.api';

@Injectable({ providedIn: 'root' })
export class ReferralsService {
    referralCommissions: number[] = referralCommissions;

    constructor(private readonly platformReferralSettingsService: PlatformReferralSettingsService, private readonly api: ReferralApi) {}

    index<D, R, Q>(queryParams: Q): Observable<ApiResponseWithPagination<R[]>>;
    index<D, R, Q>(queryParams: Q, affiliateId: number): Observable<ApiResponseWithPagination<R[]>>;
    index<D, R, Q>(queryParams: Q, affiliateId?: number): Observable<ApiResponseWithPagination<R[]>> {
        return this.api.index<D, Q>(queryParams, affiliateId);
    }

    // index(affiliateId: number, filters: Filter2Interface): Observable<ApiResponseWithPagination<ReferralsInterface>> {
    //     const params = QueryHelper.filtersHttpParams(filters?.params);
    //
    //     const options: RestApiOptions = {
    //         urlParameters: { affiliateId },
    //         request: {
    //             params,
    //             observe: 'response'
    //         }
    //     };
    //
    //     return this.rest.get<ApiResponse<ReferralsInterface>>('referrals', options).pipe(
    //         map(
    //             ({
    //                 headers,
    //                 body: {
    //                     info: { referrals }
    //                 }
    //             }) => {
    //                 const data = referrals.map((referral) => ({
    //                     ...referral,
    //                     status: +referral.status,
    //                     referral_commission_type: this.referralCommissionsType,
    //                     referral_commission_currency: this.referralCommissionCurrency
    //                 }));
    //                 return ResponseUtil.pagination<OfferInterface>(headers, data);
    //             }
    //         )
    //     );
    // }
    //
    // get settings(): PlatformSettingsModel {
    //     return this.platformSettingsQuery.settings;
    // }
    //
    // get referralProgram(): boolean {
    //     return this.settings.affReferralProgram;
    // }
    //
    // get referralCommissionsType(): number {
    //     return +this.settings?.aff_referral_commission_type;
    // }
    //
    // get referralCommission(): number {
    //     return +this.settings?.aff_referral_commission;
    // }
    //
    // get referralCommissionSource(): number {
    //     return this.settings?.aff_referral_commission_source;
    // }
    //
    // get referralCommissionCurrency(): CurrencyEnum {
    //     return this.settings.aff_referral_commission_currency;
    // }
    //
    // get referralCommissionCurrencySymbol(): CurrencySymbolEnum {
    //     return this.referralCommissionCurrency ? CurrencySymbolEnum[this.referralCommissionCurrency] : null;
    // }
}
