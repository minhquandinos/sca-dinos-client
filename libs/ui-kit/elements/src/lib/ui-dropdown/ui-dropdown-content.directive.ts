import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { UiDropdownContentService } from './ui-dropdown-content.service';

@Directive({
    selector: '[uiDropdownContent]'
})
export class UiDropdownContentDirective implements OnInit {
    constructor(private host: ElementRef, private renderer: Renderer2, private dropdownContentService: UiDropdownContentService) {}

    ngOnInit(): void {
        this.setWidth();
        this.setHeight();
    }

    private setWidth(): void {
        const { width, widthUnits } = this.dropdownContentService;

        if (width) {
            this.renderer.setStyle(this.host.nativeElement, 'width', `${width}${widthUnits}`);
            if (width < 160) {
                this.renderer.setStyle(this.host.nativeElement, 'min-width', 'auto');
            }
        }
    }

    private setHeight(): void {
        const { height, heightUnits } = this.dropdownContentService;
        if (height) {
            this.renderer.setStyle(this.host.nativeElement, 'height', `${height}${heightUnits}`);
        }
    }
}
