import { OverlayRef } from '@angular/cdk/overlay';
import { TemplateRef, Type } from '@angular/core';
import { Subject } from 'rxjs';

import { Modal3CloseEventEnum } from '../enums/modal3-close-event.enum';
import { Modal3CloseEvent } from '../models/modal3.model';
import { Modal3ConfigType } from '../types/modal3-config.type';

// R = Response Data Type, T = Data passed to Modal Type
export class BaseModal3Ref<R = any, T = any, C = any> {
    afterClosed$ = new Subject<Modal3CloseEvent<R>>();

    constructor(public overlay: OverlayRef, public content: string | TemplateRef<any> | Type<any>, public config: Modal3ConfigType<T, C>) {
        // TODO uncommented when BackdropClick is needed
        // overlay.backdropClick().subscribe((): any => this._close(Modal3CloseEventEnum.BackdropClick, null));
    }

    close(data?: R, type?: Modal3CloseEventEnum | string): void {
        this._close(type || Modal3CloseEventEnum.Close, data);
    }

    private _close(type: Modal3CloseEventEnum | string, data: R): void {
        this.overlay.dispose();
        this.afterClosed$.next({
            type,
            data
        });

        this.afterClosed$.complete();
    }
}
