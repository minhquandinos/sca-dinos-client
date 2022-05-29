import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { TrackingRequestService } from '@scaleo/core/tracking-request/service';
import { UiButtonLinkComponent } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

import { StartTrackEnum } from './disable-button-during-request.enum';
import { StartTrackByType } from './disable-button-during-request.type';

@Directive({
    selector: '[appDisableButtonDuringRequest]',
    providers: [UnsubscribeService]
})
export class DisableButtonDuringRequestDirective implements OnInit {
    private _start$ = new Subject<void>();

    @Input() startTrackBy: StartTrackByType = StartTrackEnum.Request;

    @HostListener('click', ['$event'])
    clickEvent(): void {
        if (!this.buttonLinkComponent.disabled) {
            this.trackingRequestService.id = Symbol(Util.randomChars());
            this._start$.next();

            if (this.startTrackBy === StartTrackEnum.Click) {
                this.disabled(true);
            }
        }
    }

    constructor(
        private readonly trackingRequestService: TrackingRequestService,
        private readonly buttonLinkComponent: UiButtonLinkComponent,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.trackingRequests();
    }

    private trackingRequests(): void {
        this._start$
            .pipe(
                switchMap(() => this.trackingRequestService.requests$),
                takeUntil(this.unsubscribe)
            )
            .subscribe((response) => {
                if (response.size && this.startTrackBy === StartTrackEnum.Request) {
                    this.disabled(true);
                }

                if (!response.size) {
                    this.disabled(false);
                }
            });
    }

    private disabled(value: boolean): void {
        this.buttonLinkComponent.disabled = value;
        this.buttonLinkComponent.isLoad = !value;
    }
}
