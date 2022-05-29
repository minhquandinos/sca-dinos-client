import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnitsType } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { UiDropdownContentService } from './ui-dropdown-content.service';

@Component({
    selector: 'ui-dropdown',
    templateUrl: './ui-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class UiDropdownComponent implements OnInit {
    @HostBinding('class') hostClass = 'ui-dropdown';

    @Input() className: string;

    @Input() height: number;

    @Input() heightUnits: UnitsType = 'px';

    @Input() width: number;

    @Input() widthUnits: UnitsType = 'px';

    @Input() scroll: boolean;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('dropdownContentWrapperRef', { static: true })
    dropdownContentWrapperRef: ElementRef;

    @ViewChild('dropdownContentHeaderContainerRef', { read: ViewContainerRef })
    contentHeaderContainerRef: ViewContainerRef;

    @ViewChild('dropdownActionRef', { static: true })
    private dropdownActionRef: ElementRef;

    @ViewChild('dropdownContentTpl', { static: true })
    private dropdownContentTpl: TemplateRef<any>;

    private show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private overlayPositionBuilder: OverlayPositionBuilder,
        private viewContainerRef: ViewContainerRef,
        private dropdownContentService: UiDropdownContentService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.init();
    }

    open(): void {
        this.toggle.emit(true);
        if (!this.overlayRef.hasAttached()) {
            this.overlayRef.attach(new TemplatePortal(this.dropdownContentTpl, this.viewContainerRef));
            this.show$.next(true);
        } else {
            this.overlayRef.detach();
        }
    }

    close(): void {
        this.toggle.emit(false);
        this.overlayRef.detach();
    }

    private init(): void {
        this.initOverlay();
        this.setWidth();
        this.setHeight();
        this.backdropHandlerClick();
    }

    private initOverlay(): void {
        const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.dropdownActionRef).withPositions([
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
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private backdropHandlerClick(): void {
        this.overlayRef
            .backdropClick()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((): any => this.close());
    }

    private setWidth(): void {
        if (this.width) {
            this.dropdownContentService.setWidth(this.width);
            this.dropdownContentService.setWidthUnits(this.widthUnits);
        }
    }

    private setHeight(): void {
        if (this.height) {
            this.dropdownContentService.setHeight(this.height);
            this.dropdownContentService.setHeightUnits(this.heightUnits);
        }
    }
}
