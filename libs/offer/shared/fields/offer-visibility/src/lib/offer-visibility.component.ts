import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

import { OfferVisibilityModel } from '@scaleo/offer/common';
import { StatusesName } from '@scaleo/ui-kit/elements';

import { OfferVisibilityIcon } from './classes/offer-visibility-icon';
import { OfferVisibilityLabel } from './classes/offer-visibility-label';
import { OfferVisibilityStatus } from './classes/offer-visibility-status';
import { OfferVisibilityModeType } from './offer-visibility.model';

@Component({
    selector: 'app-offer-visibility',
    templateUrl: './offer-visibility.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferVisibilityComponent {
    @Input() set visibility(value: number | OfferVisibilityModel | OfferVisibilityModel[]) {
        if (value) {
            this.initOfferVisibility(value);
            this.cdr.markForCheck();
        }
    }

    @Input() type: 'icon' | 'status';

    @Input() mode!: OfferVisibilityModeType;

    icon: string;

    label: string;

    status: StatusesName;

    constructor(private cdr: ChangeDetectorRef) {}

    private initOfferVisibility(value: number | OfferVisibilityModel | OfferVisibilityModel[]): void {
        const status = new OfferVisibilityStatus(value, this.mode);
        this.status = status.status;

        const icon = new OfferVisibilityIcon(value, this.mode);
        this.icon = icon.icon;

        const label = new OfferVisibilityLabel(value, this.mode);
        this.label = label.label;
    }
}
