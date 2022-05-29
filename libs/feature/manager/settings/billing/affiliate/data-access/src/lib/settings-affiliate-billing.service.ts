import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PaymentFrequencyIdEnum, PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

import { AffiliateBillingModel } from './models/affiliate-billing.model';
import { SettingsAffiliateBillingApi } from './settings-affiliate-billing.api';

@Injectable()
export class SettingsAffiliateBillingService {
    constructor(private api: SettingsAffiliateBillingApi) {}

    public view(): Observable<AffiliateBillingModel> {
        return this.api.view().pipe(
            map((billing: AffiliateBillingModel) => {
                let billingCopy = Util.cloneDeep(billing);
                const dates = billingCopy.invoice_days_of_the_month.split(',');
                billingCopy = {
                    ...billingCopy,
                    invoice_first_day_of_the_month: +dates[0] || 1,
                    invoice_second_day_of_the_month: +dates[1] || 15
                };
                delete billingCopy.invoice_days_of_the_month;
                return billingCopy;
            })
        );
    }

    public update(post: AffiliateBillingModel): Observable<AffiliateBillingModel> {
        const newPost = Util.cloneDeep(post);
        newPost.invoice_days_of_the_month =
            newPost.invoice_frequency === PaymentFrequencyIdEnum.BiMonthly
                ? [newPost.invoice_first_day_of_the_month, newPost.invoice_second_day_of_the_month].join(',')
                : String(post.invoice_first_day_of_the_month);
        delete newPost.invoice_first_day_of_the_month;
        delete newPost.invoice_second_day_of_the_month;

        if (post.invoice_type === AffiliateInvoiceFrequencyEnum.ByAffiliateRequest) {
            delete newPost.invoice_day_of_the_week;
            delete newPost.invoice_days_of_the_month;
            delete newPost.invoice_frequency;
        }
        return this.api.update(newPost);
    }

    // generate 1 - 28
    public get getDaysOfMonth(): PlatformListsFormatInterface[] {
        return [...Array(29).keys()]
            .filter((int) => int)
            .map((int: number) => ({
                id: int,
                title: String(int)
            }));
    }

    public get getDaysOfWeek(): PlatformListsFormatInterface[] {
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        return daysOfWeek.map((day: string) => ({
            id: day,
            title: day
        }));
    }
}
