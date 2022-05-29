import { OverlayRef } from '@angular/cdk/overlay';
import { TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseModal3Ref } from './base-modal3-ref';

// R = Response Data Type, T = Data passed to Modal Type
export class Modal3Ref<R = any, T = any, C = any> extends BaseModal3Ref<R, T, C> {
    private _action$: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);

    readonly action$ = this._action$.asObservable();

    constructor(public overlay: OverlayRef, public content: string | TemplateRef<any> | Type<any>, public config: C) {
        super(overlay, content, config);
    }

    set action(value: TemplateRef<any>) {
        this._action$.next(value);
    }
}
