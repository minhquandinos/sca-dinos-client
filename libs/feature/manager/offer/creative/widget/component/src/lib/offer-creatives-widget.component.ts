import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';
import { OfferCreativeCreateInputDataModel } from '@scaleo/feature/manager/offer/creative/upsert/data-access';
import { ManagerCreativeUpsertComponent } from '@scaleo/feature/manager/offer/creative/upsert/modal-form';
import {
    OFFER_CREATIVES_WIDGET_COLUMNS,
    OFFER_CREATIVES_WIDGET_COLUMNS_PROVIDER,
    OFFER_CREATIVES_WIDGET_PROVIDER,
    OfferCreativesWidgetQuery,
    OfferCreativesWidgetService
} from '@scaleo/feature/manager/offer/creative/widget/data-access';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-offer-creatives-widget',
    templateUrl: './offer-creatives-widget.component.html',
    providers: [OFFER_CREATIVES_WIDGET_COLUMNS_PROVIDER, OFFER_CREATIVES_WIDGET_PROVIDER, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCreativesWidgetComponent implements OnInit, OnDestroy {
    readonly items$ = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly total$ = this.pagination$.pipe(map((pagination) => pagination?.total_count));

    readonly isLoad$ = this.query.isLoad$;

    readonly notFound$ = this.query.notFound$;

    readonly canManager$ = this.checkPermissionService.check$(this.permissions.canAddEditDeleteOffers);

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.total$);

    constructor(
        private readonly translate: TranslateService,
        private readonly modal3: Modal3Service,
        private readonly query: OfferCreativesWidgetQuery,
        private readonly service: OfferCreativesWidgetService,
        @Inject(OFFER_CREATIVES_WIDGET_COLUMNS) readonly columns: UiSimpleTableHeaderModel[],
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly cdr: ChangeDetectorRef,
        private readonly unsubscribe: UnsubscribeService,
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

    addCreative(id?: number): void {
        const modalRef = this.modal3.editForm<ManagerOfferCreativeModel, OfferCreativeCreateInputDataModel>(
            ManagerCreativeUpsertComponent,
            {
                data: {
                    id,
                    offerId: this.offerDetailQuery.id
                }
            }
        ).afterClosed$;

        modalRef
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
