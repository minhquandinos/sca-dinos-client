import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardConfigService } from '@scaleo/dashboard/service';

@Component({
    selector: 'app-action-widget',
    template: `
        <ui-button-link
            *ngIf="(isEdit | async) && action"
            icon="dashboard-widget-disable"
            [iconSize]="18"
            type="floating"
            (click)="actionHandler()"
        ></ui-button-link>
        <ui-button-link
            *ngIf="(isEdit | async) && !action"
            (click)="actionHandler()"
            [label]="'interface.basic.active' | translate"
        ></ui-button-link>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionWidgetComponent {
    @Input() action: boolean;
    @Output() actionEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private dashboardWidgetConfig: DashboardConfigService) {}

    actionHandler() {
        this.actionEvent.emit(!this.action);
    }

    get isEdit(): Observable<boolean> {
        return this.dashboardWidgetConfig.isEdit$;
    }
}
