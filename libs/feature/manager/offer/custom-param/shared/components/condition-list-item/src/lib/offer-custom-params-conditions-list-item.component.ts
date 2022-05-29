import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CustomParamsConditionsIdEnum, CustomParamsTypesIdEnum } from '@scaleo/platform/list/access-data';
import { PlatformListTranslatePipe } from '@scaleo/platform/list/pipe';

import { OfferCustomParametersConditionsModel } from '../../../../../common/src/lib/models/offer-custom-param-list.model';
import { OfferCustomParamsConditionTitlePipe } from './offer-custom-params-condition-title.pipe';

@Component({
    selector: 'app-offer-custom-params-conditions-list-item',
    templateUrl: './offer-custom-params-conditions-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PlatformListTranslatePipe, OfferCustomParamsConditionTitlePipe]
})
export class OfferCustomParamsConditionsListItemComponent implements OnChanges {
    @Input() condition: OfferCustomParametersConditionsModel;

    @Input() isTooltip: boolean;

    @Input() limitChip = 2;

    isSingleCondition: boolean;

    conditionIncludePermission: boolean;

    showTooltipInList: boolean;

    ngOnChanges(changes: SimpleChanges) {
        const { condition } = changes;
        if (condition.currentValue) {
            this.isSingleCondition = this.getIsSingleCondition;
            this.conditionIncludePermission = this.getConditionIncludePermission;
            this.showTooltipInList = this.getShowTooltipInList;
        }
    }

    private get getIsSingleCondition(): boolean {
        const singleConditionsMap = [
            CustomParamsConditionsIdEnum.DeviceOSVersion,
            CustomParamsConditionsIdEnum.AffiliateSub1,
            CustomParamsConditionsIdEnum.AffiliateSub2,
            CustomParamsConditionsIdEnum.AffiliateSub3,
            CustomParamsConditionsIdEnum.AffiliateSub4,
            CustomParamsConditionsIdEnum.AffiliateSub5
        ];

        return singleConditionsMap.includes(this.condition.type);
    }

    private get getConditionIncludePermission(): boolean {
        return this.condition.permission === CustomParamsTypesIdEnum.Include;
    }

    private get getShowTooltipInList(): boolean {
        return !this.isSingleCondition && this.condition.conditions.length > this.limitChip && !this.isTooltip;
    }
}
