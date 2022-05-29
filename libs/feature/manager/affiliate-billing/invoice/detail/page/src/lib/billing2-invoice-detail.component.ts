import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, pluck, take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    Billing2InvoiceDetailService,
    InvoiceTransactionModel,
    MANAGER_INVOICE_DETAIL_PROVIDER,
    ManagerInvoiceDetailQuery
} from '@scaleo/feature/manager/affiliate-billing/invoice/detail/data-access';
import { Billing2InvoiceUpdateComponent } from '@scaleo/feature/manager/affiliate-billing/invoice/edit/modal-form';
import { InvoiceAttachmentEventEnum, InvoiceInfoModel, InvoiceUpdateAmountRequestModel } from '@scaleo/invoice/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { NavigateRootService } from '@scaleo/shared/components';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-billing2-invoice',
    templateUrl: './billing2-invoice-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, MANAGER_INVOICE_DETAIL_PROVIDER]
})
export class Billing2InvoiceDetailComponent implements OnInit {
    info$: Observable<InvoiceInfoModel> = this.managerInvoiceDetailQuery.select('info');

    status$: Observable<InvoiceStatusNameEnum> = this.info$.pipe(pluck('status'));

    currency$: Observable<CurrencyEnum> = this.info$.pipe(pluck('currency'));

    transactions$: Observable<InvoiceTransactionModel> = this.managerInvoiceDetailQuery.select('transaction');

    readonly id$ = this.detailService.id$;

    readonly adjustmentsAdvanceAccess$ = this.checkPermissionService.check$(this.permissions.canGenerateEditDeleteInvoices);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly unsubscribe: UnsubscribeService,
        private readonly detailService: Billing2InvoiceDetailService,
        private readonly managerInvoiceDetailQuery: ManagerInvoiceDetailQuery,
        private readonly modal3: Modal3Service,
        private readonly navigateRootService: NavigateRootService,
        private readonly pageTitleService: PageTitleService,
        private readonly toastr: ToastrBarService,
        private readonly translate: TranslateService,
        private readonly router: Router,
        private readonly reportsClearTempFiltersService: ReportsClearTempFiltersService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.detailService.id = this.route.snapshot.params.id;
    }

    ngOnInit(): void {
        this.detailService
            .show()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((response) => {
                this.headerTitle(response.invoice_number);
            });
    }

    edit(): void {
        this.modal3
            .editForm(Billing2InvoiceUpdateComponent, {
                data: {
                    id: this.detailService.id
                }
            })
            .afterClosed$.pipe(
                filter(({ type }) =>
                    [
                        Modal3CloseEventEnum.Create,
                        InvoiceAttachmentEventEnum.Delete,
                        Modal3CloseEventEnum.Update,
                        Modal3CloseEventEnum.Delete
                    ].includes(type as Modal3CloseEventEnum | InvoiceAttachmentEventEnum)
                ),
                take(1)
            )
            .subscribe(({ type, data }) => {
                if (type === Modal3CloseEventEnum.Delete) {
                    // TODO remove this.profile.slug
                    this.navigateRootService.navigate('/billing/invoices');
                    return;
                }

                if (type === InvoiceAttachmentEventEnum.Delete) {
                    this.detailService.update((state) => ({
                        ...state,
                        info: {
                            ...state.info,
                            attachment: ''
                        }
                    }));
                    return;
                }

                if (data) {
                    this.detailService.update((state) => ({
                        ...state,
                        info: {
                            ...state.info,
                            ...data
                        }
                    }));
                }
            });
    }

    updateAmount(event: InvoiceUpdateAmountRequestModel) {
        const translate = 'invoice.updated';
        this.detailService.updateAmount(event).then(
            () => {
                this.toastr.successes(this.translate.instant(`${translate}.success`));
            },
            () => {
                this.toastr.error(this.translate.instant(`${translate}.exception`));
            }
        );
    }

    toReport(): void {
        const { id, start_date, end_date } = this.managerInvoiceDetailQuery.getValue().info;
        this.reportsClearTempFiltersService.clearTempFilters();
        this.router.navigate(['/manager/transactions/conversions'], {
            queryParams: {
                [ReportFilterFilterEnum.AffiliateInvoice]: id,
                rangeFrom: start_date,
                rangeTo: end_date
            }
        });
    }

    private headerTitle(title: string) {
        const value: BreadcrumbInterface[] = [
            {
                key: 'invoice.invoices_title',
                link: `/manager/billing/invoices`,
                current: false
            },
            {
                key: null,
                title,
                link: null,
                current: true
            }
        ];
        this.pageTitleService.setTitle(value);
    }
}
