import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ExtendedTargetingInterface, OfferViewTargetingModel } from '@scaleo/offer/common';

@Component({
    selector: 'scaleo-offer-targeting-old-widget',
    templateUrl: './offer-profile-targeting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferProfileTargetingComponent {
    @Input() set targeting([targeting, extendedTargeting]: [OfferViewTargetingModel, ExtendedTargetingInterface[]]) {
        if (targeting && extendedTargeting) {
            this.checkShowCard(targeting, extendedTargeting);
            this.extended = this.parseExtendedTargeting(extendedTargeting);
            this.setGeo(targeting);
        }
        if (targeting) {
            this.isLoad = true;
        }
    }

    isLoad: boolean;

    extended: ExtendedTargetingInterface[] = [];

    allowedGeo: string[];

    deniedGeo: string[];

    showCard: boolean;

    private dataMap = [
        {
            name: 'connectionType',
            translate: 'connection_type'
        },
        {
            name: 'mobileOperator',
            translate: 'mobile_operator'
        },
        {
            name: 'deviceType',
            translate: 'device_type'
        },
        {
            name: 'deviceOs',
            translate: 'device_os'
        },
        {
            name: 'deviceOsVersion',
            translate: 'device_os_version'
        },
        {
            name: 'deviceBrand',
            translate: 'device_brand'
        },
        {
            name: 'deviceModel',
            translate: 'device_model'
        },
        {
            name: 'browser',
            translate: 'browser'
        },
        {
            name: 'language',
            translate: 'language'
        }
    ];

    setGeo(targeting: OfferViewTargetingModel) {
        if (targeting) {
            if (targeting.geo?.allowed) {
                this.allowedGeo = targeting.geo.allowed.split(';');
            }

            if (targeting.geo?.denied) {
                this.deniedGeo = targeting.geo.denied.split(';');
            }
        }
    }

    parseExtendedTargeting(extendedTargeting: ExtendedTargetingInterface[]): ExtendedTargetingInterface[] {
        return extendedTargeting.map((ex) => {
            const { translate } = this.dataMap.find((rul) => rul.name === ex.search_rule);
            if (typeof ex.conditions === 'string') {
                const cond = {
                    id: 1,
                    title: ex.conditions
                };
                ex.conditions = [];
                ex.conditions.push(cond);
            }
            return {
                ...ex,
                translate
            };
        });
    }

    checkShowCard(targeting: OfferViewTargetingModel, extendedTargeting: ExtendedTargetingInterface[]) {
        this.showCard = this.checkEmptyTargeting(targeting) || extendedTargeting?.length > 0;
    }

    private checkEmptyTargeting(targeting: OfferViewTargetingModel): boolean {
        if (targeting) {
            return Object.keys(targeting).some((key) => (targeting as any)?.[key]?.allowed || (targeting as any)?.[key]?.denied);
        }
        return false;
    }
}
