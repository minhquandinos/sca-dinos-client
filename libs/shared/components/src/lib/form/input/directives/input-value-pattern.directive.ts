import { Directive, Input, OnInit } from '@angular/core';

import { PATTERN_MAP, RegexpNameType } from '@scaleo/shared/regexp';

import { InputComponent } from '../input.component';

@Directive({
    selector: '[appInputValuePattern]'
})
export class InputValuePatternDirective implements OnInit {
    @Input() appInputValuePattern: RegexpNameType;

    constructor(private readonly host: InputComponent) {}

    ngOnInit(): void {
        this.host.transformPattern = PATTERN_MAP[this.appInputValuePattern];
    }
}
