import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChildren } from '@angular/core';

import { OfferTargetingType } from '@scaleo/offer/common';
import { OffersTargetingRulesNameEnum } from '@scaleo/platform/list/access-data';
import { CustomInfoComponent } from '@scaleo/shared/components';

import { BaseOfferTargetingComponent } from './components/base-offer-targeting.component';

@Component({
    selector: 'app-offer-targeting-list',
    templateUrl: './offer-targeting-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferTargetingListComponent {
    @Input() set inputTargeting(value: OfferTargetingType) {
        if (this.checkValidTargeting(value)) {
            this.items = Object.keys(value)
                .filter((item) => value[item])
                .map((item) => {
                    if (item === OffersTargetingRulesNameEnum.DeviceOSVersion) {
                        if (!Array.isArray(value[item])) {
                            const allowed = value[item]?.allowed ? [value[item].allowed] : null;
                            const denied = value[item]?.denied ? [value[item].denied] : null;
                            return {
                                ...value[item],
                                allowed,
                                denied,
                                key: item
                            };
                        }
                    }

                    return {
                        ...value[item],
                        key: item
                    };
                });
            this.isLoad = true;
        }
    }

    @Input() showDefaultGeo = true;

    @ViewChildren('customInfo') components: QueryList<CustomInfoComponent>;

    @ViewChildren('targetingComponent')
    readonly targetingComponent: QueryList<BaseOfferTargetingComponent>;

    isLoad: boolean;

    items: OfferTargetingType[] = [];

    trackByFn(index) {
        return index;
    }

    private checkValidTargeting(value: OfferTargetingType): boolean {
        const targeting = Object.entries(value);
        if (!value || targeting?.length <= 0) {
            return false;
        }

        return targeting.some(([, item]) => {
            if (!item) {
                return false;
            }
            const { allowed, denied } = item;
            if (allowed) {
                return Array.isArray(allowed);
            }
            if (denied) {
                return Array.isArray(denied);
            }
            return Array.isArray(allowed) && Array.isArray(denied);
        });
    }
}
