import { Directive, Input, OnInit, Renderer2 } from '@angular/core';

import { InputComponent } from '@scaleo/shared/components';

@Directive({
    selector: '[authSharedInputMaxLength]'
})
export class InputMaxLengthDirective implements OnInit {
    @Input() formControlName: string;

    @Input() fieldNamesForSetAttribute: string[];

    @Input() maxLengthValue: number;

    constructor(private inputComponent: InputComponent, private renderer2: Renderer2) {}

    ngOnInit(): void {
        if (this.fieldNamesForSetAttribute.includes(this.formControlName)) {
            this.renderer2.setAttribute(this.inputComponent.elementRef.nativeElement, 'maxLength', this.maxLengthValue.toString());
        }
    }
}
