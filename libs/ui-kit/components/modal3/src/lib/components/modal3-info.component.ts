import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FunctionType } from '@scaleo/core/data';

import { Modal3Ref } from '../classes/modal3-ref';
import { Modal3CloseEventEnum } from '../enums';
import { Modal3ConfigControlsModel, Modal3ConfigInfoModel } from '../models/modal3.model';
import { BaseModal3Component } from './base-modal3.component';

@Component({
    template: ` <div
        class="modal fade show d-block"
        [ngClass]="config?.wrapperClassName"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div
            class="modal-dialog modal-dialog-centered modal-dialog--info"
            [ngClass]="config?.innerClassName"
            role="document"
            [style.maxWidth]="config?.maxWidth"
            [style.minWidth]="config?.minWidth"
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
                <div
                    class="modal-footer"
                    #modalFooter
                    [ngClass]="{ 'modal-footer--border-top': config?.footer?.borderTop }"
                    *ngIf="(action$ | async) || footerTpl || controls?.length"
                >
                    <div class="d-flex my-auto" *ngIf="action$ | async">
                        <ng-template [ngTemplateOutlet]="action$ | async"></ng-template>
                    </div>
                    <ng-container *ngIf="footerTpl" [ngTemplateOutlet]="footerTpl"></ng-container>
                    <div class="d-flex" *ngIf="controls?.length">
                        <ng-container *ngFor="let control of controls">
                            <ui-button-link
                                className="ml-2"
                                [type]="control.buttonType"
                                [label]="control.label"
                                [color]="control?.color"
                                (toggle)="controlClick($event, control.eventName, control?.callback)"
                            ></ui-button-link>
                        </ng-container>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class Modal3InfoComponent extends BaseModal3Component implements OnInit {
    readonly title = this.ref.config?.title;

    readonly defaultTitle$ = this.translate.stream('interface.basic.confirmation');

    readonly footerTpl: TemplateRef<any>;

    readonly controls: Modal3ConfigControlsModel[];

    readonly config: Modal3ConfigInfoModel<any>;

    action$ = this.ref.action$;

    @ViewChild('modalFooter') set modalFooter(container: ElementRef) {
        if (container) {
            this.config?.footer?.className?.split(' ').forEach((className) => {
                this.renderer.addClass(container.nativeElement, className);
            });
        }
    }

    constructor(
        protected readonly ref: Modal3Ref<any, Modal3ConfigInfoModel<any>>,
        private readonly translate: TranslateService,
        private readonly renderer: Renderer2
    ) {
        super(ref);
        this.config = ref.config;
        this.footerTpl = this.config?.footer?.template;
        if (!this.footerTpl) {
            this.controls = this.config?.footer?.controls;
        }
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

    cancel() {
        this.ref.close(null, Modal3CloseEventEnum.Cancel);
    }

    controlClick(event: Event, eventName: string, callback: FunctionType) {
        if (callback) {
            const cb = callback(this.ref, event);
            if (cb instanceof Function) {
                cb();
            }
        } else {
            this.ref.close(null, eventName);
        }
    }
}
