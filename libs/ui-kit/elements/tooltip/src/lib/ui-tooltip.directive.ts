import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';

import { UiTooltipComponent } from './ui-tooltip.component';

@Directive({
    selector: '[uiTooltip]'
})
export class UiTooltipDirective implements OnInit {
    @Input() uiTooltip: string | TemplateRef<any>;

    private overlayRef: OverlayRef;

    @HostListener('mouseenter', ['$event'])
    show() {
        if (!this.overlayRef.hasAttached()) {
            const tooltipRef: ComponentRef<UiTooltipComponent> = this.overlayRef.attach(new ComponentPortal(UiTooltipComponent));
            tooltipRef.instance.text = this.uiTooltip;
        }
    }

    @HostListener('mouseleave', ['$event'])
    hide() {
        this.detectHideTooltip();
    }

    constructor(private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder, private elementRef: ElementRef) {}

    ngOnInit(): void {
        const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withPositions([
            {
                originX: 'start', // 'end'
                originY: 'bottom',
                overlayX: 'start', // 'end'
                overlayY: 'top',
                offsetY: 6
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
                offsetY: 6
            }
        ]);

        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private detectHideTooltip(): void {
        this.tooltipMouserEnter()
            .pipe(
                startWith(false),
                distinctUntilChanged(),
                debounceTime(30),
                tap((isHoveredTooltip) => {
                    if (!isHoveredTooltip) {
                        this.overlayRef.detach();
                    }
                }),
                filter((isHoveredTooltip) => isHoveredTooltip),
                switchMap(() => this.tooltipMouserLeave()),
                filter((isLeaveTooltip) => isLeaveTooltip),
                tap((isLeaveTooltip) => {
                    if (isLeaveTooltip) {
                        this.overlayRef.detach();
                    }
                }),
                take(1)
            )
            .subscribe();
    }

    private tooltipMouserEnter(): Observable<boolean> {
        return fromEvent(this.overlayRef.overlayElement, 'mouseenter').pipe(map((): any => true));
    }

    private tooltipMouserLeave(): Observable<any> {
        return fromEvent(this.overlayRef.overlayElement, 'mouseleave').pipe(map((): any => true));
    }
}
