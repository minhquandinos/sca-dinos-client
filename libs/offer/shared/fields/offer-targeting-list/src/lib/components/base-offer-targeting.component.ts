import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { OffersTargetingRulesNameEnum } from '../../../../../../../platform/list/access-data/src/lib/enums/platform-list/offers-targeting-rules.enum';
import { OFFER_TARGETING_MAP } from '../offer-targeting.const';

@Component({
    template: ''
})
export abstract class BaseOfferTargetingComponent implements OnInit, OnChanges {
    @Input() item: unknown;

    @Input() itemKey: keyof Record<OffersTargetingRulesNameEnum, string>;

    translateName: string;

    icon: string;

    @ViewChild('outputTooltipTpl', { static: true })
    readonly outputTooltipTpl: TemplateRef<any>;

    ngOnInit(): void {
        this.initTargeting();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { item } = changes;

        if (item.currentValue) {
            this.initTargeting();
        }
    }

    private initTargeting(): void {
        this.translateName = this.element.translate;
        this.icon = this.element.icon;
    }

    private get element(): typeof OFFER_TARGETING_MAP[keyof typeof OFFER_TARGETING_MAP] {
        return OFFER_TARGETING_MAP[this.itemKey];
    }
}
