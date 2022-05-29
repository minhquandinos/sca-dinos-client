import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { GoalInterface } from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';

@Component({
    selector: 'app-offer-goal-type-name',
    templateUrl: './offer-goal-type-name.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferGoalTypeNameComponent implements OnInit {
    @Input() item: GoalInterface;

    @Input() type: 'revenue' | 'payout';

    @Input() currency: CurrencyEnum;

    @Input()
    showAffiliatePayout: boolean;

    @Input()
    showGoalTypeName: boolean;

    hasType: boolean;

    ngOnInit(): void {
        if (this.item?.[this.type]) {
            this.hasType = true;
        }
    }
}
