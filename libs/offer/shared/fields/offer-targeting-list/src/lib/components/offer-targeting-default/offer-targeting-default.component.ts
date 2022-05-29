import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { OffersTargetingDefaultModel } from '@scaleo/offer/common';

import { BaseOfferTargetingComponent } from '../base-offer-targeting.component';

@Component({
    selector: 'app-offer-targeting-default',
    templateUrl: './offer-targeting-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferTargetingDefaultComponent extends BaseOfferTargetingComponent implements OnInit, OnChanges {
    @Input() item: OffersTargetingDefaultModel;

    allowedDenied: unknown[] = [];

    constructor() {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }
}
