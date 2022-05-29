import { Directive, OnInit, Optional, TemplateRef } from '@angular/core';

import { Modal3Ref } from '@scaleo/ui-kit/components/modal3';

@Directive({
    selector: '[scaleoModal3InfoAction]'
})
export class Modal3InfoActionDirective implements OnInit {
    constructor(private readonly template: TemplateRef<any>, @Optional() private readonly modalRef: Modal3Ref) {}

    ngOnInit(): void {
        if (this.modalRef) {
            Promise.resolve().then(() => {
                this.modalRef.action = this.template;
            });
        }
    }
}
