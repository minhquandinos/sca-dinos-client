import { ChangeDetectionStrategy, Component, HostBinding, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { AdjustmentActionsEnum } from '@scaleo/feature/manager/reports/transactions/adjustment/common';
import { ManagerAdjustmentUpsertComponent } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/modal-form';
import { DropdownEntityComponent } from '@scaleo/ui-kit/components/dropdown-entity';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { DropdownEntityMenuComponent, DropdownEntityMenuModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-report-conversions-import',
    templateUrl: './manager-report-conversions-import.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerReportConversionsImportComponent {
    readonly menu: DropdownEntityMenuModel[] = [
        {
            title: this.translate.stream('reports_page.conversions.import.insert_conversions'),
            subtitle: this.translate.stream('reports_page.conversions.import.description.insert_conversions'),
            action: (): void => this.importConversion(AdjustmentActionsEnum.InsertConversions)
        },
        {
            title: this.translate.stream('reports_page.conversions.import.insert_conversions_via_csv'),
            subtitle: this.translate.stream('reports_page.conversions.import.description.insert_conversions_via_csv'),
            action: (): void => this.importConversion(AdjustmentActionsEnum.InsertConversionsViaCSV)
        }
    ];

    @HostBinding('class') hostClass = 'report-conversions-import d-flex align-items-center';

    @ViewChild(DropdownEntityComponent) dropdownEntityMenuComponent: DropdownEntityMenuComponent;

    public readonly isMobile$ = this.mediaWatcherService.isMobile$;

    public readonly isNotMobile$ = this.mediaWatcherService.isNotMobile$;

    constructor(private modal3: Modal3Service, private translate: TranslateService, private mediaWatcherService: MediaWatcherService) {}

    private importConversion(actionId: AdjustmentActionsEnum.InsertConversions | AdjustmentActionsEnum.InsertConversionsViaCSV): void {
        this.modal3.editForm(ManagerAdjustmentUpsertComponent, {
            data: {
                actionId
            }
        });
    }

    public action(element: DropdownEntityMenuModel): void {
        this.dropdownEntityMenuComponent.action(element);
    }
}
