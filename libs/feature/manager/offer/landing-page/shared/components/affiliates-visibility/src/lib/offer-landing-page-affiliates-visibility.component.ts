import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';

@Component({
    selector: 'app-offer-landing-page-affiliates-visibility',
    template: `
        <app-boolean-label
            *ngIf="visible || (!visible && visibleAffiliates.length <= 0); else contAffiliatesTpl"
            [value]="visible"
        ></app-boolean-label>
        <ng-template #contAffiliatesTpl>
            <div class="d-flex align-items-center"><ui-svg-icon size="16" icon="ic_user"></ui-svg-icon> {{ visibleAffiliates.length }}</div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferLandingPageAffiliatesVisibilityComponent {
    @Input() visible: BooleanEnum;

    @Input() visibleAffiliates: BaseIdTitleModel[] = [];
}
