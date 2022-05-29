import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Input, ViewChild } from '@angular/core';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { Observable } from 'rxjs';

import { DashboardWidgetModel } from '@scaleo/dashboard/common';
import { DashboardConfigService } from '@scaleo/dashboard/service';

@Component({
    selector: 'app-dashboard-grid',
    templateUrl: './dashboard-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardGridComponent implements AfterViewInit {
    @ViewChild('gridsterComponent', { static: true })
    gridsterComponent: GridsterComponent;

    @Input() activeWidgets: DashboardWidgetModel[] = [];

    @Input() inactiveWidgets: DashboardWidgetModel[] = [];

    isEdit$: Observable<boolean> = this.dashboardConfigService.isEdit$;

    itemToPush: GridsterItemComponent;

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.gridsterComponent.calculateLayoutDebounce();
    }

    constructor(public dashboardConfigService: DashboardConfigService) {}

    ngAfterViewInit(): void {
        this.gridsterComponent.calculateLayout();
    }

    // onDrop(event) {}
    //
    // itemResize(item: any, itemComponent: any): void {
    //     // this.dashboardWidgetService.reflowWidgets();
    // }

    trackBy(index: number, item: DashboardWidgetModel): string {
        return item.id;
    }
}
