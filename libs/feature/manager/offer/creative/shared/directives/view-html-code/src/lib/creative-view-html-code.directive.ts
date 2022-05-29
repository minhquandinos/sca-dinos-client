import { Directive, Input, OnInit } from '@angular/core';

import { TextareaComponent } from '@scaleo/shared/components';

@Directive({
    selector: '[appCreativeViewHtmlCode]'
})
export class CreativeViewHtmlCodeDirective implements OnInit {
    @Input('appCreativeViewHtmlCode')
    value: string;

    constructor(private readonly host: TextareaComponent) {}

    ngOnInit(): void {
        this.host.writeValue(this.value);
        this.host.renderer2.setAttribute(this.host.elementRef.nativeElement, 'readonly', '');
    }
}
