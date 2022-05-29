import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { take } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ConversionEditModalComponent } from '@scaleo/feature/manager/reports/transactions/conversion/upsert/modal-form';
import { SheetExtensionType } from '@scaleo/platform/data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { ReportsService } from '@scaleo/reports/state';
import { BaseTransactionReportComponent } from '@scaleo/reports/transactions/common';
import { ReportConversionsQuery, ReportConversionsService } from '@scaleo/reports/transactions/conversion/data-access';
import { TransactionReportListComponent } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { animationRules } from '@scaleo/shared/animations';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-manager-report-conversions',
    templateUrl: './manager-report-conversions.component.html',
    styleUrls: ['./manager-report-conversions.component.scss'],
    animations: [animationRules.fade()],
    providers: [
        {
            provide: REPORTS_LAYOUT,
            useExisting: ReportsLayoutComponent
        },
        UnsubscribeService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ManagerReportConversionsComponent extends BaseTransactionReportComponent implements OnInit, OnDestroy, AfterViewInit {
    @HostBinding('class') hostClass = 'report-conversions';

    @ViewChild(TransactionReportListComponent)
    private set _transactionReportListRef(component: TransactionReportListComponent) {
        if (component && !this.transactionReportListRef) {
            this.transactionReportListRef = component;
        }
    }

    readonly showImportConversions$ = this.checkPermissionService.check$(
        [
            this.permissions.canChangeConversionStatus,
            this.permissions.canAccessAdjustments,
            this.permissions.canAccessOffers,
            this.permissions.canAccessAffiliates
        ],
        'every'
    );

    transactionReportListRef: TransactionReportListComponent;

    selectedItems: string[] = [];

    constructor(
        private readonly conversionsService: ReportConversionsService,
        private readonly conversionsQuery: ReportConversionsQuery,
        private route: ActivatedRoute,
        private router: Router,
        private reportsService: ReportsService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        private readonly modal3Service: Modal3Service,
        private actions: Actions,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private cdr: ChangeDetectorRef,
        private readonly unsubscribe: UnsubscribeService
    ) {
        super(conversionsService, conversionsQuery);
    }

    ngOnInit(): void {
        // this.conversionsService.initDonorFilters();
        this.conversionsService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.reportsLayout.createHeader(this.layoutHeaderTpl);

        setTimeout(() => {
            this.cdr.detectChanges();
        }, 3000);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.conversionsService.resetStore();
        this.reportsService.manualResetHandler();
    }

    exportData(format: SheetExtensionType): void {
        const exportDataRequest$ = this.conversionsService.exportData(format, this.selectedItems).pipe(
            tap(() => {
                this.clearSelected();
            })
        );

        this.exportDataToFile(exportDataRequest$);
    }

    clearSelected(): void {
        this.transactionReportListRef.clearSelected();
    }

    trafficLogsLink(): void {
        this.router.navigate(['../advertiser-postbacks'], { relativeTo: this.route });
    }

    statusWasChanged(): void {
        this.updateSubject$.next('');
        this.clearSelected();
        this.conversionsService.updateLoading();
    }

    selectItems(items: string[]): void {
        this.selectedItems = items;
    }

    editConversion(id: string): void {
        const modal = this.modal3Service.editForm(ConversionEditModalComponent, {
            data: {
                id
            }
        });

        modal.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                take(1)
            )
            .subscribe(() => {
                this.updateSubject$.next('');
                this.refreshed();
            });
    }

    changedFilters(filters: ReportFilterModel[]): void {
        super.changedFilters(filters);
        // this.actions.dispatch(reportConversionActions.selectedFilters());
    }

    columnWasChanged(columns: string[]) {
        super.columnWasChanged(columns);
        // this.actions.dispatch(reportConversionActions.updatedColumns());
    }
}
