import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { ReportEnum } from '@scaleo/reports/common';

@Directive({
    selector: '[appRightAlignForNumber]'
})
export class RightAlignForNumberDirective implements OnChanges {
    @Input() item: string | number;

    @Input() key: string;

    @Input() reportType: string;

    readonly notUseStyle: string[] = ['hour', 'month', 'year'];

    readonly useStyleForConversionsAndClicks: string[] = ['revenue', 'payout', 'profit'];

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

    ngOnChanges(): void {
        const item = this.item && this.key ? this.item[this.key] : null;

        if (item || item === 0) {
            switch (this.reportType) {
                case ReportEnum.Statistics:
                    if ((!!item || item === 0) && !Number.isNaN(+item) && !this.notUseStyle.includes(this.key)) {
                        this.setTextRight();
                    } else {
                        this.setTextLeft();
                    }
                    break;
                case ReportEnum.Conversions:
                case ReportEnum.Clicks:
                    if (this.useStyleForConversionsAndClicks.includes(this.key)) {
                        this.setTextRight();
                    } else {
                        this.setTextLeft();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    setTextRight() {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'justify-content-start');
        this.renderer2.addClass(this.elementRef.nativeElement, 'justify-content-end');
        this.renderer2.addClass(this.elementRef.nativeElement, 'ml-auto');
    }

    setTextLeft() {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'justify-content-end');
        this.renderer2.removeClass(this.elementRef.nativeElement, 'ml-auto');
        this.renderer2.addClass(this.elementRef.nativeElement, 'justify-content-start');
    }
}
