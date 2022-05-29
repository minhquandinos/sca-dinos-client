import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AdvertiserCreateComponent } from '@scaleo/feature/manager/advertiser/upsert/component';
import {
    MANAGER_DASHBOARD_PENDING_ADVERTISER_PROVIDER,
    ManagerDashboardPendingAdvertiserModel,
    ManagerDashboardPendingAdvertiserQuery,
    ManagerDashboardPendingAdvertiserService
} from '@scaleo/feature/manager/dashboard/widgets/pending-records/shared/advertiser-pending/data-access';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-dashboard-pending-advertiser-list',
    templateUrl: './dashboard-pending-advertiser.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_DASHBOARD_PENDING_ADVERTISER_PROVIDER, UnsubscribeService]
})
export class DashboardPendingAdvertiserComponent implements OnInit {
    items$: Observable<ManagerDashboardPendingAdvertiserModel[]> = this.advertiserQuery.selectAll();

    isLoad$ = this.advertiserQuery.selectLoading().pipe(map((loading) => !loading));

    readonly notFound$ = this.advertiserQuery.notFound$;

    showFooter = true;

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'info'
        },
        {
            value: 'date'
        }
    ];

    constructor(
        private advertiserService: ManagerDashboardPendingAdvertiserService,
        private advertiserQuery: ManagerDashboardPendingAdvertiserQuery,
        private modal3Service: Modal3Service,
        private platformCountsService: PlatformCountsService,
        private unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.advertiserService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    openModal(editId: number): void {
        const modal$ = this.modal3Service.editForm(AdvertiserCreateComponent, {
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
                this.advertiserService.reload();
                this.platformCountsService.update();
            });
    }
}
