import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { BooleanEnum } from '@scaleo/core/data';
import { GoalStatusIdEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-offer-goals-column-title',
    template: `
        <app-status-dot-color type="goals_statuses" [status]="status"></app-status-dot-color>
        <span class="text-pre-wrap pl-2">
            {{ title | format: 'idName':id }}
            <ng-container *ngIf="alias">({{ alias }})</ng-container>
        </span>
        <ui-svg-icon *ngIf="isDefault" icon="star-fill-static" tooltip="{{ 'offers_page.goals.default_goal' | translate }}"></ui-svg-icon>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferGoalsColumnTitleComponent {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() status: GoalStatusIdEnum;

    @Input() isDefault: BooleanEnum;

    @Input() alias: string;

    @Input() id: number;

    @Input() title: string;
}
