import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateCreateComponent } from '@scaleo/feature/manager/affiliate/upsert/modal-form';
import {
    MANAGER_DASHBOARD_PENDING_AFFILIATE_PROVIDER,
    ManagerDashboardPendingAffiliateModel,
    ManagerDashboardPendingAffiliateQuery,
    ManagerDashboardPendingAffiliateService
} from '@scaleo/feature/manager/dashboard/widgets/pending-records/shared/affiliate-pending/data-access';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-dashboard-pending-affiliate-list',
    templateUrl: './dashboard-pending-affiliate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_DASHBOARD_PENDING_AFFILIATE_PROVIDER, UnsubscribeService]
})
export class DashboardPendingAffiliateComponent implements OnInit {
    readonly items$: Observable<ManagerDashboardPendingAffiliateModel[]> = this.affiliateQuery.selectAll();

    readonly isLoad$ = this.affiliateQuery.selectLoading().pipe(map((loading) => !loading));

    readonly notFound$ = this.affiliateQuery.notFound$;

    readonly showFooter = true;

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'info'
        },
        {
            value: 'date'
        }
    ];

    constructor(
        private affiliateService: ManagerDashboardPendingAffiliateService,
        private affiliateQuery: ManagerDashboardPendingAffiliateQuery,
        private unsubscribe: UnsubscribeService,
        private modal3Service: Modal3Service,
        private platformCountsService: PlatformCountsService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.affiliateService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    openModal(editId: number): void {
        const modal$ = this.modal3Service.editForm(AffiliateCreateComponent, {
            data: {
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(type as Modal3CloseEventEnum)),
                take(1)
            )
            .subscribe(() => {
                this.affiliateService.reload();
                this.platformCountsService.update();
            });
    }
}
