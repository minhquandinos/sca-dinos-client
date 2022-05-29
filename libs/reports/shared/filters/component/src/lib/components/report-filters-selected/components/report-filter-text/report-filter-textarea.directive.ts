import { Directive, HostListener, Renderer2 } from '@angular/core';

import { TextareaComponent } from '@scaleo/shared/components';

@Directive({
    selector: '[appReportFilterTextarea]'
})
export class ReportFilterTextareaDirective {
    constructor(private renderer2: Renderer2, private hostComponent: TextareaComponent) {}

    @HostListener('input', ['$event.target.value'])
    onInput(value: any) {
        const newValue = value.trimStart().replace(/\s+|;|,/g, '\r\n');
        this.renderer2.setProperty(this.hostComponent.elementRef.nativeElement, 'value', newValue);
    }
}
