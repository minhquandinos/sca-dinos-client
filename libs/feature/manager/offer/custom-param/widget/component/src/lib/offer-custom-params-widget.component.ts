import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferCustomParameterCreateComponent } from '@scaleo/feature/manager/offer/custom-param/upsert/modal-form';
import {
    OFFER_CUSTOM_PARAMETER_WIDGET_PROVIDER,
    OfferCustomParamsWidgetQuery,
    OfferCustomParamsWidgetService
} from '@scaleo/feature/manager/offer/custom-param/widget/data-access';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-offer-custom-params-widget',
    templateUrl: './offer-custom-params-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_CUSTOM_PARAMETER_WIDGET_PROVIDER, UnsubscribeService]
})
export class OfferCustomParamsWidgetComponent implements OnInit, OnDestroy {
    readonly items$ = this.query.selectAll();

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'affiliates',
            translateSchema: 'table.column.affiliates',
            width: '25%'
        },
        {
            value: 'conditions',
            translateSchema: 'table.column.conditions',
            width: '20%'
        },
        {
            value: 'parameters',
            translateSchema: 'table.column.custom_parameters'
        },
        {
            value: 'effective_dates',
            translateSchema: 'table.column.effective_dates',
            width: '20%'
        }
    ];

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly total$ = this.pagination$.pipe(map((pagination) => pagination?.total_count));

    readonly isLoad$ = this.query.isLoad$;

    readonly notFound$ = this.query.notFound$;

    readonly canManager$ = this.checkPermissionService.check$(this.permissions.canManageCustomParameters);

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.total$);

    constructor(
        private readonly query: OfferCustomParamsWidgetQuery,
        private readonly service: OfferCustomParamsWidgetService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3: Modal3Service,
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.offerDetailQuery.id$
            .pipe(
                filter((id) => !!id),
                switchMap((id) => this.service.index(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.service.resetStore();
    }

    openModal(id?: number) {
        const modal$ = this.modal3.editForm(OfferCustomParameterCreateComponent, {
            data: {
                id
            }
        }).afterClosed$;

        modal$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.service.reload();
            });
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }
}
