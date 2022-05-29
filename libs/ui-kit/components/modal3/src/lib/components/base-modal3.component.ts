import { Component, OnInit, TemplateRef } from '@angular/core';

import { BaseModal3Ref } from '../classes/base-modal3-ref';
import { Modal3ConfigModel } from '../models/modal3.model';

@Component({
    template: ''
})
export abstract class BaseModal3Component implements OnInit {
    contentType: 'template' | 'string' | 'component';

    content: string | TemplateRef<any> | unknown | any;

    context: any;

    readonly disableClose = this.ref.config?.disableClose;

    protected constructor(protected readonly ref: BaseModal3Ref<any, Modal3ConfigModel<any>>) {}

    close() {
        this.ref.close(null);
    }

    ngOnInit(): void {
        this.content = this.ref.content as any;
    }
}
