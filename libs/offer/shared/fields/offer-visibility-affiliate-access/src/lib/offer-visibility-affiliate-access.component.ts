import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { OfferVisibilityModel } from '@scaleo/offer/common';
import { DateFormatService } from '@scaleo/platform/format/service';

import { OfferVisibilityAffiliateAccessList } from './classes/offer-visibility-affiliate-access-list';

@Component({
    selector: 'app-offer-visibility-affiliate-access',
    template: `
        <ng-container *ngIf="color && (label$ | async) as label">
            <ui-status-dot [color]="color" [tooltip]="label"></ui-status-dot>
            <span class="text-nowrap ml-2">{{ label }}</span>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferVisibilityAffiliateAccessComponent implements OnChanges {
    @HostBinding('class') hostClass = 'd-flex align-items-center';

    @Input() visibility: OfferVisibilityModel | OfferVisibilityModel[];

    status: any;

    label$: Observable<string>;

    color: string;

    constructor(
        private cdr: ChangeDetectorRef,
        private readonly translate: TranslateService,
        private readonly dateFormatService: DateFormatService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { visibility } = changes;

        if (visibility?.currentValue) {
            this.init();
        }
    }

    init() {
        const visibility = new OfferVisibilityAffiliateAccessList(this.visibility, this.translate, this.dateFormatService);
        this.label$ = visibility.label$;
        this.color = visibility.color;
        this.cdr.markForCheck();
    }
}
