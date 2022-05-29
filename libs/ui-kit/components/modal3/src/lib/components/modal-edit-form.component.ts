import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { Modal3EditFormRef } from '../classes/modal3-edit-form-ref';
import { Modal3ConfigEditFormModel } from '../models/modal3.model';
import { BaseModal3Component } from './base-modal3.component';

@Component({
    template: ` <div class="page-modal overflow-x-hidden">
        <div class="page-modal-wrapper" [ngClass]="config?.wrapperClassName" [@slideModalLeft]>
            <ui-page-wrapper>
                <ui-page-wrapper-header [sticky]="true">
                    <div class="d-flex align-items-center mr-auto">
                        <ui-button-link
                            *ngIf="!config?.disableClose"
                            type="simple"
                            icon="close"
                            [iconSize]="24"
                            (toggle)="close()"
                        ></ui-button-link>
                        <ng-template [ngTemplateOutlet]="title$ | async"></ng-template>
                    </div>
                    <div class="d-flex my-auto">
                        <ng-template [ngTemplateOutlet]="action$ | async"></ng-template>
                    </div>
                </ui-page-wrapper-header>
                <ui-page-wrapper-content [ngClass]="config?.contentClassName">
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
                </ui-page-wrapper-content>
            </ui-page-wrapper>
        </div>
    </div>`,
    animations: [
        trigger('slideModalLeft', [
            state('hide', style({ transform: 'translateX(100%)' })),
            transition('* => hide', animate('.3s ease-in-out')),
            transition(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-in', style({ transform: 'translateX(0%)' }))])
        ])
    ]
})
export class ModalEditFormComponent extends BaseModal3Component implements OnInit {
    title$ = this.ref.title$;

    action$ = this.ref.action$;

    readonly config: Modal3ConfigEditFormModel<any>;

    constructor(protected readonly ref: Modal3EditFormRef) {
        super(ref);
        this.config = ref.config;
    }

    close() {
        this.ref.close();
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
}
