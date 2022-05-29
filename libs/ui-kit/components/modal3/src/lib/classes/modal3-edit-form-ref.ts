import { OverlayRef } from '@angular/cdk/overlay';
import { TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Modal3ConfigEditFormModel } from '../models/modal3.model';
import { Modal3ConfigType } from '../types/modal3-config.type';
import { BaseModal3Ref } from './base-modal3-ref';

// R = Response Data Type, T = Data passed to Modal Type
export class Modal3EditFormRef<R = any, T = any> extends BaseModal3Ref<R, T, Modal3ConfigEditFormModel<T>> {
    private _title$: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);

    readonly title$ = this._title$.asObservable();

    private _action$: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);

    readonly action$ = this._action$.asObservable();

    constructor(
        public readonly overlay: OverlayRef,
        public readonly content: string | TemplateRef<any> | Type<any>,
        public readonly config: Modal3ConfigType<T, Modal3ConfigEditFormModel<T>>
    ) {
        super(overlay, content, config);
    }

    set title(value: TemplateRef<any>) {
        this._title$.next(value);
    }

    set action(value: TemplateRef<any>) {
        this._action$.next(value);
    }
}
