import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferLandingPageUpsertComponent } from '@scaleo/feature/manager/offer/landing-page/upsert/modal-form';
import {
    OFFER_LANDING_PAGE_WIDGET_PROVIDER,
    OfferLandingPageWidgetQuery,
    OfferLandingPageWidgetService
} from '@scaleo/feature/manager/offer/landing-page/widget/data-access';
import { OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-offer-landing-page-widget',
    templateUrl: './offer-landing-page-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_LANDING_PAGE_WIDGET_PROVIDER]
})
export class OfferLandingPageWidgetComponent implements OnInit {
    @Output() changed: EventEmitter<void> = new EventEmitter<void>();

    readonly items$ = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly total$ = this.pagination$.pipe(map((pagination) => pagination?.total_count));

    readonly notFound$ = this.query.notFound$;

    readonly isLoad$ = this.query.isLoad$;

    readonly canManager$ = this.checkPermissionService.check$(this.permissions.canAddEditDeleteOffers);

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.total$);

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'title',
            translateSchema: 'table.column.title',
            width: '200px'
        },
        {
            value: 'type',
            translateSchema: 'table.column.type',
            width: '60px'
        },
        {
            value: 'url',
            translateSchema: 'table.column.url',
            width: '200px'
        },
        {
            value: 'preview',
            translateSchema: 'interface.basic.preview_url',
            width: '80px'
        },
        {
            value: 'visible_to_specific_affiliates_only',
            translateSchema: 'offers_page.urls.visible_to_affiliates',
            width: '70px'
        },
        {
            value: 'targeting',
            translateSchema: 'table.column.targeting',
            width: '15%'
        }
    ];

    readonly offerUrlsTypeIdEnum = OfferUrlsTypeIdEnum;

    constructor(
        private query: OfferLandingPageWidgetQuery,
        private service: OfferLandingPageWidgetService,
        private unsubscribe: UnsubscribeService,
        private modal3: Modal3Service,
        private offerDetailQuery: OfferDetailQuery,
        private readonly window: WindowRefService,
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
        const modalRef = this.modal3.editForm(OfferLandingPageUpsertComponent, {
            data: {
                id
            }
        }).afterClosed$;

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
                this.changed.emit();
            });
    }

    toPreview(url: string): void {
        this.window.nativeWindow.open(url, '_blank');
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }
}
