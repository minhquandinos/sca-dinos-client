import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OfferTargetingListGeoModel } from 'libs/offer/common/src/lib/offer/offer-targeting-list.model';
import { BehaviorSubject } from 'rxjs';

import { BaseOfferTargetingComponent } from '../base-offer-targeting.component';

@Component({
    selector: 'app-offer-targeting-geo',
    templateUrl: './offer-targeting-geo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferTargetingGeoComponent extends BaseOfferTargetingComponent implements OnInit, OnChanges {
    @Input() item: OfferTargetingListGeoModel;

    @Input() showDefaultGeo: boolean;

    private _showTargetingGeo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    readonly showTargetingGeo$ = this._showTargetingGeo$.asObservable();

    constructor() {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        const { item } = changes;
        if (item.currentValue) {
            const { allowed, denied } = item.currentValue;
            if (!this.showDefaultGeo) {
                const show = allowed.length > 0 || denied.length > 0;
                this._showTargetingGeo$.next(show);
            }
        }
    }

    trackByFn(index) {
        return index;
    }
}
