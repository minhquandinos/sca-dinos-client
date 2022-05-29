import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GoalInterface } from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { GoalsCapsTypesEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-offer-goal-cap-type',
    templateUrl: './offer-goal-cap-type.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferGoalCapTypeComponent {
    @Input() item: GoalInterface;

    @Input() currency: CurrencyEnum;

    readonly goalsCapsTypesEnum = GoalsCapsTypesEnum;
}
