import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { OfferGoalListModel } from '@scaleo/feature/manager/offer/goal/list/data-access';
import { GoalsConverter } from '@scaleo/offer/goal/common';
import { GOAL_TRACKING_METHOD_LIST_TRANSLATE_MAP, GoalTypeEnum } from '@scaleo/platform/list/access-data';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-offer-goal-tracking-method',
    templateUrl: './offer-goal-tracking-method.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GoalsConverter]
})
export class OfferGoalTrackingMethodComponent implements OnChanges {
    @Input() item: OfferGoalListModel;

    @Input() link: string;

    @Input() isProfile: boolean;

    trackingCode = '';

    public readonly goalTypeEnum = GoalTypeEnum;

    constructor(
        private readonly goalsConverter: GoalsConverter,
        private readonly modal3: Modal3Service,
        private readonly translate: TranslateService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { item } = changes;

        if (item.currentValue) {
            this.setTrackingCode();
        }
    }

    showInfo(template: TemplateRef<any>) {
        const translate = GOAL_TRACKING_METHOD_LIST_TRANSLATE_MAP[this.item.tracking_method.id];
        let title = this.translate.instant(translate);
        if (this.isProfile) {
            title = title.replace(/\((.*?)\)/g, '');
        }

        this.modal3.info(template, {
            title
        });
    }

    private setTrackingCode(): void {
        this.trackingCode = this.goalsConverter.convertTrackingCode({
            trackingType: this.item.tracking_method.id,
            goalId: this.item.id,
            typeGoal: this.item.type.id,
            trackingLink: this.item.tracking_domain,
            alias: this.item.alias,
            goalIsDefault: !!this.item.is_default,
            postbackToken: this.item?.postback_token
        });
    }
}
