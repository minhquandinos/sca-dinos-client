import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GoalInterface } from '@scaleo/offer/common';

@Component({
    selector: 'app-offer-goal-conversion-status',
    templateUrl: './offer-goal-conversion-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferGoalConversionStatusComponent {
    @Input() item: GoalInterface;

    @Input() showM: boolean;

    @Input() showC: boolean;
}
