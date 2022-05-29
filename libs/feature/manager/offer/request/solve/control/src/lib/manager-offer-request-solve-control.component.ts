import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { OfferRequestSolveService, OfferRequestType } from '@scaleo/feature/manager/offer/request/solve/data-access';
import { UiButtonLinkComponent, UiButtonLinkSizeType } from '@scaleo/ui-kit/elements';

import { OfferRequestControlService } from './services/offer-request-control.service';

@Component({
    selector: 'scaleo-manager-offer-request-control',
    template: `
        <app-offer-request-action
            [label]="'interface.basic.approve' | translate"
            requestType="allow"
            color="green"
            [buttonSize]="buttonSize"
            (actionClick)="changeStatus($event)"
        ></app-offer-request-action>
        <app-offer-request-action
            [label]="'interface.basic.reject' | translate"
            requestType="deny"
            color="red"
            [buttonSize]="buttonSize"
            (actionClick)="changeStatus($event)"
        ></app-offer-request-action>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OfferRequestControlService]
})
export class ManagerOfferRequestSolveControlComponent {
    @Input() id: number;

    @Input() buttonSize: UiButtonLinkSizeType = 'small';

    @HostBinding('class') hostClass = 'd-flex';

    @Output() changed: EventEmitter<OfferRequestType> = new EventEmitter<OfferRequestType>();

    @ViewChild('allowRef')
    readonly allowRef: UiButtonLinkComponent;

    @ViewChild('denyRef')
    readonly denyRef: UiButtonLinkComponent;

    constructor(
        private readonly offerRequestControlService: OfferRequestControlService,
        private readonly offerRequestSolveService: OfferRequestSolveService
    ) {}

    changeStatus(status: OfferRequestType): void {
        this.offerRequestSolveService
            .updateStatus(this.id, status)
            .pipe(
                catchError((error) => {
                    this.offerRequestControlService.actionClick = null;
                    return throwError(error);
                }),
                take(1)
            )
            .subscribe(() => {
                this.changed.emit(status);
            });
    }
}
