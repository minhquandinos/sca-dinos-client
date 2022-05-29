import { AfterViewInit, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';

import { UiPageWrapperFooterBorderTopEnum, UiPageWrapperFooterSizeType } from '../types/ui-page-wrapper.type';

@Component({
    selector: 'ui-page-wrapper-footer',
    template: `
        <div class="page-wrapper-footer d-flex align-items-center" [ngClass]="className" #footerRef>
            <ng-content></ng-content>
        </div>
    `
})
export class UiPageWrapperFooterComponent implements AfterViewInit {
    @HostBinding('class') hostClass = 'ui-page-wrapper-footer';

    @Input() className: string;

    @Input() size: UiPageWrapperFooterSizeType = 'medium';

    @Input() borderTop: keyof Record<UiPageWrapperFooterBorderTopEnum, string>;

    @ViewChild('footerRef') footerRef: ElementRef;

    constructor(private readonly renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.initFooterStyle();
    }

    initBorderTopStyle(value: UiPageWrapperFooterBorderTopEnum) {
        if (this.footerRef?.nativeElement && value) {
            let borderTop = '';
            switch (value) {
                case UiPageWrapperFooterBorderTopEnum.Inline:
                    borderTop = `page-wrapper-footer__border-top-inline`;
                    break;
                case UiPageWrapperFooterBorderTopEnum.Shadow:
                    borderTop = `page-wrapper-footer__border-top-shadow`;
                    break;
                case UiPageWrapperFooterBorderTopEnum.None:
                    borderTop = 'border-top-0';
                    break;
                default:
                    break;
            }
            this.renderer.addClass(this.footerRef.nativeElement, borderTop);
        }
    }

    private initFooterStyle() {
        this.sizeStyle();
        this.initBorderTopStyle(this.borderTop);
    }

    private sizeStyle() {
        if (this.size) {
            const sizeMap: { [size in UiPageWrapperFooterSizeType]: string } = {
                large: 'is-1',
                medium: 'is-2',
                small: 'is-3'
            };
            const sizeClass = sizeMap[this.size];
            if (sizeClass) {
                this.renderer.addClass(this.footerRef.nativeElement, sizeClass);
            }
        }
    }
}
