import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';

import { SnackBarConfigModel } from '..';
import { SNACKBAR_CONFIG_TOKEN } from '../tokens/snack-bar.token';

// TODO
// 1. add close button
@Component({
    selector: 'ui-snack-bar-container',
    template: `
        <ng-template #textTpl>
            <ng-container>{{ config?.text }}</ng-container>
        </ng-template>

        <ng-template #templateTpl>
            <ng-container
                [ngTemplateOutlet]="config.template.entity"
                [ngTemplateOutletContext]="{ $implicit: config.template.context }"
            ></ng-container>
        </ng-template>

        <ng-template #component>
            <ng-container
                [ngComponentOutlet]="config.component.entity"
                [ngComponentOutletInjector]="config.component?.injector"
            ></ng-container>
        </ng-template>

        <ng-container *ngIf="config?.emptyContainer">
            <ng-container *ngIf="config?.text" [ngTemplateOutlet]="textTpl"></ng-container>
            <ng-container *ngIf="config?.template" [ngTemplateOutlet]="templateTpl"></ng-container>
            <ng-container *ngIf="config?.component" [ngTemplateOutlet]="component"></ng-container>
        </ng-container>

        <ng-container *ngIf="!config?.emptyContainer">
            <div class="ui-snack-bar d-flex align-items-center">
                <div class="ui-snack-bar__content">
                    <ng-container *ngIf="config?.text" [ngTemplateOutlet]="textTpl"></ng-container>
                    <ng-container *ngIf="config?.template" [ngTemplateOutlet]="templateTpl"></ng-container>
                    <ng-container *ngIf="config?.component" [ngTemplateOutlet]="component"></ng-container>
                </div>

                <!--    <div class="ui-snack-bar__action">-->
                <!--        <ng-content select="[action]"></ng-content>-->
                <!--    </div>-->
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSnackBarContainerComponent {
    readonly config: SnackBarConfigModel;

    constructor(@Optional() @Inject(SNACKBAR_CONFIG_TOKEN) private readonly snackbarConfig: SnackBarConfigModel) {
        this.config = this.snackbarConfig;
    }
}
