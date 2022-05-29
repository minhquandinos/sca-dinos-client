import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { OffersTargetingRulesNameEnum } from '../../../../../../../../platform/list/access-data/src/lib/enums/platform-list/offers-targeting-rules.enum';
import { OfferTargetingGeoElementModel } from '../../../../../../../common/src/lib/offer';

@Component({
    selector: 'app-offer-targeting-item',
    template: `
        <app-custom-info class="d-flex align-items-center p-y-1">
            <ui-svg-icon info-label size="16" [tooltip]="translateName | translate" [icon]="icon"></ui-svg-icon>

            <div info-value class="my-auto">
                <ng-content></ng-content>
                <ng-container *ngIf="allowed?.length > 0 || denied?.length > 0">
                    <div class="d-flex align-items-center">
                        <ng-template
                            [ngTemplateOutlet]="template"
                            [ngTemplateOutletContext]="{ allowed: allowed, denied: denied }"
                        ></ng-template>

                        <ui-svg-icon
                            *appOfferTargetingItemShowDot="{ allowed, denied, showIfMore  }"
                            icon="more-horisontal-small"
                            size="14"
                            className="m-l-3"
                            [tooltip]="tooltipRenderTpl"
                            contentType="template"
                        >
                        </ui-svg-icon>
                    </div>
                </ng-container>
            </div>
        </app-custom-info>
        <ng-template #tooltipRenderTpl>
            <ng-container
                [ngTemplateOutlet]="tooltipTemplate"
                [ngTemplateOutletContext]="{ allowed: allowed, denied: denied }"
            ></ng-container>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferTargetingItemComponent {
    @Input() allowed: OfferTargetingGeoElementModel[] | string[] = [];

    @Input() denied: OfferTargetingGeoElementModel[] | string[] = [];

    @Input() translateName: string;

    @Input() key: keyof Record<OffersTargetingRulesNameEnum, string>;

    @Input() icon: string;

    @Input() template: TemplateRef<any>;

    @Input() tooltipTemplate: TemplateRef<any>;

    @Input() showIfMore = 2;
}
