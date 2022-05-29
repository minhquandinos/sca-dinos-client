import { Component, forwardRef, Host, Input, OnInit, Optional, Renderer2, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';

@Component({
    selector: 'app-wysiwyg-editor',
    templateUrl: './wysiwyg-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            useExisting: forwardRef((): any => WysiwygEditorComponent),
            multi: true
        }
    ]
})
export class WysiwygEditorComponent extends BaseControlValueAccessor<any> implements OnInit {
    @Input() formControlName: string;

    @Input() label: string;

    @Input() placeholder = '';

    @ViewChild('editor', { static: true }) private editor: any;

    public control: AbstractControl;

    public required: boolean;

    model: string;

    constructor(private renderer2: Renderer2, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
        super();
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);

                this.model = this.control.value ? this.control.value : '';

                if (this.control.validator) {
                    const validator = this.control.validator({} as AbstractControl);
                    if (this.control && validator && validator.required) {
                        this.required = true;
                    }
                }
            }
        }
    }

    onFocus(): void {
        this.renderer2.addClass(this.editor.elementRef.nativeElement, 'ql-focus');
    }

    onBlur(): void {
        this.renderer2.removeClass(this.editor.elementRef.nativeElement, 'ql-focus');
    }

    writeValue(value: any): void {
        this.value = value?.html;
    }

    handleContentChanged(value: any): void {
        this.onChange(value.html);
    }
}
