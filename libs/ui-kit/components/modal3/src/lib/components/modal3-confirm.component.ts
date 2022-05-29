import { Component, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { ButtonType } from '@scaleo/ui-kit/elements';

import { Modal3Ref } from '../classes/modal3-ref';
import { Modal3CloseEventEnum, Modal3ConfirmPresetEnum } from '../enums';
import { Modal3ConfigConfirmModel } from '../models/modal3.model';
import { BaseModal3Component } from './base-modal3.component';

@Component({
    template: `
        <div
            class="modal fade show d-block"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-centered modal-dialog--confirm"
                role="document"
                [style.maxWidth]="config?.maxWidth"
                [style.width]="config?.width"
            >
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center">
                        <div class="modal-title title is-4">
                            {{ title ? title : (defaultTitle$ | async) }}
                        </div>
                        <ui-button-link
                            *ngIf="!disableClose"
                            type="simple"
                            icon="close"
                            [iconSize]="24"
                            (toggle)="close()"
                            [tooltip]="'interface.basic.close' | translate"
                        ></ui-button-link>
                    </div>
                    <div class="modal-body">
                        <ng-container [ngSwitch]="contentType">
                            <ng-container *ngSwitchCase="'string'">
                                <div class="box">
                                    <div [innerHTML]="content"></div>
                                </div>
                            </ng-container>

                            <ng-container *ngSwitchCase="'template'">
                                <ng-container *ngTemplateOutlet="content; context: context"></ng-container>
                            </ng-container>

                            <ng-container *ngSwitchCase="'component'">
                                <ng-container #element *ngComponentOutlet="content"></ng-container>
                            </ng-container>
                        </ng-container>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex ml-auto">
                            <ui-button-link
                                type="simple"
                                [label]="'shared.dictionary.cancel' | translate"
                                (toggle)="cancel()"
                                className="mr-2"
                            ></ui-button-link>
                            <ui-button-link [type]="typeButton" [label]="actionLabel" (toggle)="save()"></ui-button-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Modal3ConfirmComponent extends BaseModal3Component implements OnInit {
    title = this.ref.config?.title;

    readonly defaultTitle$ = this._translate.stream('interface.basic.confirmation');

    typeButton: ButtonType = this.ref.config?.typeButton;

    actionLabel = this.ref.config?.actionLabel;

    readonly config: Modal3ConfigConfirmModel<any>;

    constructor(protected readonly ref: Modal3Ref<any, Modal3ConfigConfirmModel<any>>, private readonly _translate: TranslateService) {
        super(ref);
        this.config = ref.config;
        this._setDefaultFactory();
    }

    close() {
        this.ref.close(null);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (typeof this.content === 'string') {
            this.contentType = 'string';
        } else if (this.content instanceof TemplateRef) {
            this.contentType = 'template';
            this.context = {
                close: this.ref.close.bind(this.ref)
            };
        } else {
            this.contentType = 'component';
        }
    }

    save() {
        this.ref.close(null, Modal3CloseEventEnum.Confirm);
    }

    cancel() {
        this.ref.close(null, Modal3CloseEventEnum.Cancel);
    }

    setDefaultForDelete(): void {
        this.actionLabel = this._translate.instant('shared.dictionary.delete');
        this.title = this._translate.instant('delete.delete_confirm_title');
    }

    private _setDefaultFactory(): void {
        if (this.typeButton === 'delete') {
            this.setDefaultForDelete();
        } else {
            this._setDefaultTitle();
            this._setDefaultLabel();
        }
    }

    private _setDefaultTitle(): void {
        const titleMap: BaseObjectModel = {
            [Modal3ConfirmPresetEnum.Confirmation]: 'interface.basic.continue',
            [Modal3ConfirmPresetEnum.AreYouSure]: 'confirm_message.are_you_sure'
        };

        let titleSchema;
        if (Object.entries(titleMap).some(([first]) => first === this.title)) {
            titleSchema = titleMap?.[this.title];
        }

        if (!this.title) {
            titleSchema = titleMap[Modal3ConfirmPresetEnum.Confirmation];
        }

        if (titleSchema) {
            this.title = this._translate.instant(titleSchema);
        }
    }

    private _setDefaultLabel(): void {
        this.actionLabel = this.ref.config?.actionLabel || this._translate.instant('interface.basic.continue');
    }
}
