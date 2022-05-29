import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-offer-goal-name',
    template: ` <span class="text-pre-wrap">{{ id + ' ' + name | format: 'idName' }}</span> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferGoalNameComponent {
    @Input() id: number;

    @Input() name: string;
}
