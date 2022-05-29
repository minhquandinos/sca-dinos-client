import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ManagerBillingInvoiceUpsertModalService } from '@scaleo/feature/manager/affiliate-billing/common';
import { affiliateInvoicesWidgetColumns } from '@scaleo/feature/manager/affiliate-billing/invoice/widgets/invoices/common';
import {
    MANAGER_INVOICES_WIDGET_PROVIDER,
    ManagerInvoicesWidgetQuery,
    ManagerInvoicesWidgetService
} from '@scaleo/feature/manager/affiliate-billing/invoice/widgets/invoices/data-access';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootPipe } from '@scaleo/shared/components';

@Component({
    selector: 'app-billing2-affiliate-invoices-widget',
    templateUrl: './affiliate-invoices-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_INVOICES_WIDGET_PROVIDER, ManagerBillingInvoiceUpsertModalService, UnsubscribeService, NavigateRootPipe]
})
export class AffiliateInvoicesWidgetComponent implements OnInit {
    @Input()
    affiliateId: number;

    @Output()
    updated: EventEmitter<void> = new EventEmitter();

    invoices$ = this.managerInvoicesWidgetQuery.invoices$;

    showViewAllLink$ = this.managerInvoicesWidgetQuery.total$.pipe(map((invoices) => invoices >= 10));

    columns = affiliateInvoicesWidgetColumns;

    loading$ = this.managerInvoicesWidgetQuery.loading$.pipe(map((loading) => !loading));

    notFound$ = this.managerInvoicesWidgetQuery.notFound$;

    readonly invoiceStatusNameEnum = InvoiceStatusNameEnum;

    constructor(
        private service: ManagerInvoicesWidgetService,
        private upsertModalService: ManagerBillingInvoiceUpsertModalService,
        private unsubscribe: UnsubscribeService,
        private router: Router,
        private navigateRootPipe: NavigateRootPipe,
        private readonly managerInvoicesWidgetQuery: ManagerInvoicesWidgetQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.service.index(this.affiliateId).pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    generate() {
        this.upsertModalService
            .generate(this.affiliateId)
            .pipe(take(1))
            .subscribe(() => {
                this.service.reload();
                this.updated.emit();
            });
    }

    update(id: number) {
        this.upsertModalService
            .update(id)
            .pipe(
                tap(() => {
                    this.service.reload();
                }),
                delay(4000),
                take(1)
            )
            .subscribe(() => {
                this.updated.emit();
            });
    }

    navigate() {
        const url = '/billing/invoices';
        this.router.navigate([this.navigateRootPipe.transform(url)], { queryParams: { affiliates: this.affiliateId } });
    }

    reload(): void {
        this.service.reload();
    }
}
