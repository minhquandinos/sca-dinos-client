import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroupName } from '@angular/forms';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { PlatformCurrencyService } from '@scaleo/platform/currency/service';
import { PlatformListsBaseInterface } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-adjustment-payout',
    templateUrl: './adjustment-payout.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class AdjustmentPayoutComponent implements OnInit {
    @Input() formGroupName: FormGroupName;

    @Input() currencyList: PlatformListsBaseInterface[];

    revenuePayoutInputText: string = this.platformCurrencyService.sign(CurrencyEnum.USD);

    currency: CurrencyEnum = CurrencyEnum.USD;

    selectedOfferId = 0;

    constructor(
        public parentForm: FormGroupDirective,
        private platformSettingsQuery: PlatformSettingsQuery,
        private readonly platformCurrencyService: PlatformCurrencyService
    ) {}

    ngOnInit(): void {
        const offer = this.parentForm.form.get('details').get('offer').value;
        const goal = this.parentForm.form.get('details').get('goal');
        this.selectedOfferId = offer.id;
        if (this.selectedOfferId && goal.value === 0) {
            goal.setValue({ id: 0, title: 'all_goals', type: 0 });
        }
        this.currency = offer?.currency ? offer.currency : this.platformSettingsQuery.settings.currency;
        if (goal.value.id !== 0 && goal.value.type === 4) {
            this.revenuePayoutInputText = '%';
        } else {
            this.setRevenuePayout();
        }
    }

    selectedOffer(offer: any): void {
        const { newValue } = offer;
        if (newValue && newValue.id) {
            this.currency = newValue.currency;
            this.selectedOfferId = newValue.id;
            this.setRevenuePayout();
            const goal = this.parentForm.form.get('details').get('goal');
            goal.patchValue({
                id: 0,
                title: 'all_goals'
            });
        }
    }

    changeGoal(event: any): void {
        if (event.newValue.type === 4) {
            this.revenuePayoutInputText = '%';
        } else {
            this.setRevenuePayout();
        }
    }

    setRevenuePayout(): void {
        const currency = this.currencyList.find((cur) => cur.code === this.currency);
        this.revenuePayoutInputText = currency?.title.split(' ')[0];
    }
}
