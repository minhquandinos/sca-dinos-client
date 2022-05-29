import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { ConfigTableColumn2RequiredService } from '../config-table-column2-required.service';
import { ConfigTableColumn2Model } from '../models/config-table-column2.model';

@Directive({
    selector: '[appConfigTableColumn2ItemRequired]'
})
export class ConfigTableColumn2ItemRequiredDirective implements AfterViewInit {
    @Input() param: ConfigTableColumn2Model;

    constructor(private elementRef: ElementRef, private requiredService: ConfigTableColumn2RequiredService, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        if (this.requiredService.isRequiredColumns(this.param.key)) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
        }
    }
}
