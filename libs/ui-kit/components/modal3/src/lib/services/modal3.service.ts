import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';

import { Modal3EditFormRef } from '../classes/modal3-edit-form-ref';
import { Modal3Ref } from '../classes/modal3-ref';
import { ModalEditFormComponent } from '../components/modal-edit-form.component';
import { Modal3ConfirmComponent } from '../components/modal3-confirm.component';
import { Modal3InfoComponent } from '../components/modal3-info.component';
import { Modal3ConfigConfirmModel, Modal3ConfigEditFormModel, Modal3ConfigInfoModel } from '../models/modal3.model';
import { Modal3ConfigType } from '../types/modal3-config.type';

@Injectable()
export class Modal3Service {
    constructor(private readonly overlay: Overlay) {}

    editForm<R = any, T = any>(
        content: string | TemplateRef<any> | Type<any>,
        config: Modal3ConfigEditFormModel<T>
    ): Modal3EditFormRef<R, T> {
        return this.open<R, T, Modal3ConfigEditFormModel<T>>(ModalEditFormComponent, content, config, 'editForm') as Modal3EditFormRef<
            R,
            T
        >;
    }

    confirm<R = any, T = any>(content: string | TemplateRef<any> | Type<any>, config: Modal3ConfigConfirmModel<T> = {}): Modal3Ref<R> {
        return this.open<R, T, Modal3ConfigConfirmModel<T>>(Modal3ConfirmComponent, content, config) as Modal3Ref<R>;
    }

    info<R = any, T = any>(content: string | TemplateRef<any> | Type<any>, config: Modal3ConfigInfoModel<T>): Modal3Ref<R> {
        return this.open(Modal3InfoComponent, content, config) as Modal3Ref<R>;
    }

    private open<R = any, T = any, C = any>(
        modalComponent: Type<any>,
        content: string | TemplateRef<any> | Type<any>,
        config: Modal3ConfigType<T, C>,
        type: 'editForm' | 'default' = 'default'
    ): Modal3Ref<R, T> | Modal3EditFormRef<R, T> {
        const create = this.modalRefFactory(type, content, config);

        create.overlayRef.attach(new ComponentPortal(modalComponent, null, create.injector));

        return create.modalRef;
    }

    private modalRefFactory<R = any, T = any, C = any>(
        type: 'editForm' | 'default' = 'default',
        content: string | TemplateRef<any> | Type<any>,
        config: Modal3ConfigType<T, C>
    ): {
        injector: Injector;
        modalRef: Modal3Ref | Modal3EditFormRef;
        overlayRef: OverlayRef;
    } {
        // TODO uncommented when OverlayConfig is needed
        // const configs = new OverlayConfig({
        //     hasBackdrop: true,
        //     panelClass: ['modal', 'is-active'],
        //     backdropClass: 'modal-background'
        // });

        // const overlayRef = this.overlay.create(configs);
        const overlayRef = this.overlay.create();

        let modalRef: Modal3Ref | Modal3EditFormRef;
        let injector;
        if (type === 'editForm') {
            modalRef = new Modal3EditFormRef<R, T>(overlayRef, content, config);
            injector = Injector.create({
                providers: [
                    {
                        provide: Modal3EditFormRef,
                        useValue: modalRef
                    }
                ]
            });
        }

        if (type === 'default') {
            modalRef = new Modal3Ref<R, T>(overlayRef, content, config);
            injector = Injector.create({
                providers: [
                    {
                        provide: Modal3Ref,
                        useValue: modalRef
                    }
                ]
            });
        }

        return {
            modalRef,
            overlayRef,
            injector
        };
    }
}
