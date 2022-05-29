import type { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { MediaQueryEnum, MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { UiTable2ColumnsModel } from '../..';
import { UiTable2TooltipService } from '../../services/ui-table2-tooltip.service';

@Component({
    selector: 'ui-table2-header-col',
    templateUrl: './ui-table2-header-col.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class UiTable2HeaderColComponent implements OnInit {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() set column(value: UiTable2ColumnsModel) {
        this.newColumn = value;
    }

    @Input() index: number;

    @Input() level: number;

    newColumn: UiTable2ColumnsModel;

    @ViewChild('containerRef', { static: true }) containerRef: ElementRef;

    constructor(
        private renderer2: Renderer2,
        private tooltipService: UiTable2TooltipService,
        private readonly mediaWatcherService: MediaWatcherService,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.setAttribute();
        this.setTemplateForTooltip();
        this.detectBreakpoint();
    }

    private setAttribute() {
        if (this.newColumn.dataAttributes) {
            this.newColumn.dataAttributes.forEach((attr) => {
                const key = Object.keys(attr)[0];
                this.renderer2.setAttribute(this.containerRef.nativeElement, key, attr[key]);
            });
        }
    }

    setTemplateForTooltip() {
        this.tooltipService
            .isTooltipTemplatesNotEmpty$(this.newColumn.tooltipKey || this.newColumn.value)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => {
                if (value) {
                    this.newColumn = this.tooltipService.appendTooltipToColumn(this.newColumn);
                }
            });
    }

    private detectBreakpoint(): void {
        this.mediaWatcherService.breakpointObserver
            .observe(Object.values(MediaQueryEnum))
            .pipe(
                filter((): any => !!this.newColumn?.responsive),
                tap((v: BreakpointState) => {
                    Object.keys(this.newColumn?.responsive).forEach((key) => {
                        if (v.breakpoints[MediaQueryEnum[key as keyof typeof MediaQueryEnum]]) {
                            Object.entries(this.newColumn?.responsive?.[key as keyof typeof MediaQueryEnum]?.style).forEach(
                                ([style, value]) => {
                                    this.renderer2.setStyle(this.containerRef.nativeElement, style, value);
                                }
                            );
                        }
                    });
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
