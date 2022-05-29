import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, map, pluck, shareReplay, switchMap, take } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { DOMAIN_WIDGET_LIST_PROVIDER, DomainWidgetListService } from '@scaleo/feature/manager/affiliate/domain/data-access';
import { AffiliateDomainCreateComponent } from '@scaleo/feature/manager/affiliate/domain/upsert';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';
import { NavigateRootService } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-affiliate-profile-domains',
    templateUrl: './affiliate-profile-domains.component.html',
    providers: [UnsubscribeService, DOMAIN_WIDGET_LIST_PROVIDER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateProfileDomainsComponent {
    @Input() set affiliateId(id: number) {
        this._affiliateId$.next(id);
    }

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'tracking_domain',
            translateSchema: 'table.column.tracking_domain',
            width: '40%'
        },
        {
            value: 'configuration',
            translateSchema: 'table.column.configuration',
            width: '60%'
        }
    ];

    private _affiliateId$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);

    private _items$ = this._affiliateId$.pipe(
        filter((id) => !!id),
        switchMap((id) => this.domainWidgetListService.index(id)),
        shareReplay()
    );

    readonly items$ = this._items$.pipe(pluck('results'));

    readonly count$ = this._items$.pipe(pluck('pagination', 'total_count'));

    readonly loading$ = this.domainWidgetListService.loading$.pipe(map((loading) => !loading));

    notFound$ = this.items$.pipe(map((items) => !items.length));

    readonly isDomainsDisabled$ = this.checkPermissionService
        .check$([this.permissions.canAddEditDeleteDomains, this.planFeature.domains], 'every')
        .pipe(map((status) => !status));

    constructor(
        private readonly modal3Service: Modal3Service,
        private readonly unsubscribe: UnsubscribeService,
        private readonly domainWidgetListService: DomainWidgetListService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly planFeature: PlatformPlanFeatureType,
        private readonly checkPermissionService: CheckPermissionService,
        private readonly plan: PlanFeatureService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly navigateRootService: NavigateRootService
    ) {}

    public openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(AffiliateDomainCreateComponent, {
            data: {
                editId: editId || null,
                affiliateId: this._affiliateId$.value
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.domainWidgetListService.update();
            });
    }

    toDomains() {
        this.router.navigate(['domains'], { relativeTo: this.route });
    }
}
