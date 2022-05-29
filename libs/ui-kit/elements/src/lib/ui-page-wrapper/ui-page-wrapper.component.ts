import { AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';

import { UiPageWrapperContentComponent } from './ui-page-wrapper-content/ui-page-wrapper-content.component';
import { UiPageWrapperFooterComponent } from './ui-page-wrapper-footer/ui-page-wrapper-footer.component';
import { UiPageWrapperHeaderComponent } from './ui-page-wrapper-header/ui-page-wrapper-header.component';

@Component({
    selector: 'ui-page-wrapper',
    template: `
        <div class="page-wrapper" [ngClass]="className" #pageRef>
            <ng-content></ng-content>
        </div>
    `
})
export class UiPageWrapperComponent implements AfterViewInit {
    @Input() borderRadius: 4 | 6 | 8;

    @Input() boxShadow = false;

    @Input() className = '';

    @ViewChild('pageRef', { static: true }) pageRef: ElementRef;

    @HostBinding('class') hostClass = 'ui-page-wrapper d-block h-100';

    @ContentChild(UiPageWrapperHeaderComponent)
    header: UiPageWrapperHeaderComponent;

    @ContentChild(UiPageWrapperContentComponent)
    content: UiPageWrapperContentComponent;

    @ContentChild(UiPageWrapperFooterComponent)
    footer: UiPageWrapperFooterComponent;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        if (this.boxShadow) {
            this.renderer.addClass(this.pageRef.nativeElement, 'box-shadow');
        }

        if (this.borderRadius) {
            this.renderer.addClass(this.pageRef.nativeElement, `border-radius-${this.borderRadius}`);
        }
    }
}
