import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { ResizeObserverOutputModel, ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

@Directive({
    selector: '[coreScaleoResizeObserver]',
    providers: [ResizeObserverService, UnsubscribeService]
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
    @Output() resized: EventEmitter<ResizeObserverOutputModel> = new EventEmitter<ResizeObserverOutputModel>();

    constructor(private host: ElementRef, private resizeObserverService: ResizeObserverService, private unsubscribe: UnsubscribeService) {}

    ngOnInit(): void {
        this.resizeObserverService
            .observe(this.host.nativeElement)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((v) => {
                this.resized.emit(v);
            });
    }

    ngOnDestroy(): void {
        this.resizeObserverService.ngOnDestroy();
    }
}
