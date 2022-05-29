import { Directive, OnInit, Optional, TemplateRef } from '@angular/core';

import { Modal3EditFormRef } from '../../../classes/modal3-edit-form-ref';

@Directive({
    selector: '[appModal3Action]'
})
export class Modal3ActionDirective implements OnInit {
    constructor(private readonly template: TemplateRef<any>, @Optional() private readonly modalRef: Modal3EditFormRef) {}

    ngOnInit(): void {
        if (this.modalRef) {
            Promise.resolve().then(() => {
                this.modalRef.action = this.template;
            });
        }
    }
}
