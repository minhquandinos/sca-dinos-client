import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { OfferRequestType } from '@scaleo/feature/manager/offer/request/solve/data-access';
import { UiButtonLinkComponent, UiButtonLinkSizeType } from '@scaleo/ui-kit/elements';

import { OfferRequestControlService } from '../services/offer-request-control.service';

@Component({
    selector: 'app-offer-request-action',
    template: `
        <ui-button-link
            className="ml-2"
            [label]="label"
            [isLoad]="load$ | async"
            [disabled]="disabled$ | async"
            [size]="buttonSize"
            type="simple"
            [color]="color"
            (toggle)="clickHandler()"
        ></ui-button-link>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferRequestButtonComponent {
    @Input() label: string;

    @Input() color: 'red' | 'green';

    @Input() requestType: OfferRequestType;

    @Input() buttonSize: UiButtonLinkSizeType = 'small';

    @Output() actionClick = new EventEmitter<OfferRequestType>();

    load$ = this.offerRequestControlService.actionClick$.pipe(map((type) => type !== this.requestType));

    disabled$ = this.offerRequestControlService.actionClick$.pipe(map((type) => type && !(type === this.requestType)));

    @ViewChild(UiButtonLinkComponent)
    readonly buttonRef: UiButtonLinkComponent;

    constructor(private readonly offerRequestControlService: OfferRequestControlService) {}

    clickHandler() {
        this.actionClick.emit(this.requestType);
        this.offerRequestControlService.actionClick = this.requestType;
    }
}
