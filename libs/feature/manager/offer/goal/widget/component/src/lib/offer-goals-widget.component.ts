import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OFFER_GOALS_COLUMNS_TOKEN, OfferConfigGoalsUtil, offerGoalColumnListFactory } from '@scaleo/feature/manager/offer/goal/common';
import { OfferGoalCreateComponent } from '@scaleo/feature/manager/offer/goal/upsert/modal-form';
import {
    OFFER_GOAL_WIDGET_PROVIDER,
    OfferGoalsWidgetQuery,
    OfferGoalsWidgetService
} from '@scaleo/feature/manager/offer/goal/widget/data-access';
import { GoalTypeEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

import { offerGoalListColumnsWidgetConfig } from './config/offer-goal-list-columns-widget.config';

@Component({
    selector: 'scaleo-manager-offer-goals-widget',
    templateUrl: './offer-goals-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_GOAL_WIDGET_PROVIDER, UnsubscribeService, offerGoalColumnListFactory(offerGoalListColumnsWidgetConfig)]
})
export class OfferGoalsWidgetComponent implements OnInit {
    readonly goalTypeEnum = GoalTypeEnum;

    readonly items$ = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly total$ = this.pagination$.pipe(map((pagination) => pagination?.total_count));

    readonly notFound$ = this.query.notFound$;

    readonly loading$ = this.query.loading$;

    readonly isLoad$ = this.query.isLoad$;

    readonly canManager$ = this.checkPermissionService.check$(this.permissions.canAddEditDeleteOffers);

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.total$);

    constructor(
        private query: OfferGoalsWidgetQuery,
        private service: OfferGoalsWidgetService,
        private unsubscribe: UnsubscribeService,
        @Inject(OFFER_GOALS_COLUMNS_TOKEN) public readonly columns: UiSimpleTableHeaderModel[],
        private modal3: Modal3Service,
        private offerDetailQuery: OfferDetailQuery,
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

    upsertForm(id?: number) {
        const modalRef$ = this.modal3.editForm(OfferGoalCreateComponent, {
            data: {
                editId: id,
                offerId: this.offerDetailQuery.id,
                showDefaultButton: OfferConfigGoalsUtil.showDefaultButton(this.query.getAll())
            }
        }).afterClosed$;

        modalRef$
            .pipe(
                filter(({ type }) => {
                    return [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Delete, Modal3CloseEventEnum.Update].includes(
                        type as Modal3CloseEventEnum
                    );
                }),
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
