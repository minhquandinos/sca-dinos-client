import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';

import { DASHBOARD_WIDGET, DashboardWidgetModel } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';

@Component({
    selector: 'app-dashboard-toolbar-edit',
    template: `
        <div class="dashboard-grid-toolbar d-flex">
            <div>
                <ui-button-link
                    [label]="'dashboard_grid.toolbar.add_widget' | translate"
                    icon="plus-small"
                    type="floating"
                    (click)="addWidget()"
                ></ui-button-link>
            </div>
            <div class="d-flex ml-auto">
                <ui-button-link
                    className="mr-4"
                    color="red"
                    type="text"
                    [label]="'dashboard_grid.toolbar.restore_default' | translate"
                    (click)="restore()"
                ></ui-button-link>
                <ui-button-link
                    className="mr-2"
                    type="text"
                    [label]="'shared.dictionary.cancel' | translate"
                    label="Cancel"
                    (click)="cancel()"
                ></ui-button-link>
                <ui-button-link [label]="'shared.dictionary.save' | translate" (click)="save()"></ui-button-link>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardToolbarEditComponent {
    @HostBinding('class') hostClass = 'd-block';

    constructor(
        private _dashboardConfigService: DashboardConfigService,
        private _dashboardWidgetService: DashboardWidgetService,
        @Inject(DOCUMENT) private _document: Document
    ) {}

    restore() {
        this._restoreDefaultWidgets();
        this._dashboardConfigService.edit(false);
    }

    cancel() {
        this._dashboardWidgetService.resetActiveWidgets();
        this._dashboardConfigService.edit(false);
    }

    save() {
        this._dashboardConfigService.edit(false);
    }

    addWidget() {
        this._dashboardWidgetService.scrollTo('.dashboard-grid-inactive');
    }

    private _restoreDefaultWidgets() {
        const defaultWidgets: DashboardWidgetModel[] = [
            {
                id: DASHBOARD_WIDGET.networkSummary,
                identifier: DASHBOARD_WIDGET.networkSummary,
                active: true,
                multi: false,
                gridConfig: {
                    cols: 10,
                    rows: 2,
                    y: 0,
                    x: 0,
                    resizeEnabled: false
                },
                settings: {
                    list: [
                        {
                            key: 'impression',
                            selected: false
                        },
                        {
                            key: 'ctr',
                            selected: true
                        },
                        {
                            key: 'cr',
                            selected: true
                        }
                    ]
                }
            }
        ];

        this._dashboardWidgetService.widgets$.next(defaultWidgets);
    }
}
