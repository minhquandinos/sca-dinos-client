import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferTargetingEditComponent } from '@scaleo/feature/manager/offer/targeting/upsert/modal-form';
import {
    OFFER_TARGETING_WIDGET_PROVIDER,
    OfferTargetingWidgetQuery,
    OfferTargetingWidgetService
} from '@scaleo/feature/manager/offer/targeting/widget/data-access';
import { OfferAllowedDeniedIdEnum, OfferTargetingGeoModel } from '@scaleo/offer/common';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-manager-offer-targeting-widget',
    templateUrl: './offer-targeting-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, OFFER_TARGETING_WIDGET_PROVIDER]
})
export class OfferTargetingWidgetComponent implements OnInit {
    allowedGeo$: Observable<OfferTargetingGeoModel[]> = this.offerTargetingWidgetQuery.select('gt_included_ids');

    deniedGeo$: Observable<OfferTargetingGeoModel[]> = this.offerTargetingWidgetQuery.select('gt_excluded_ids');

    showGeo$: Observable<boolean> = combineLatest([this.allowedGeo$, this.deniedGeo$]).pipe(
        map(([allowed, denied]) => allowed.length > 0 || denied.length > 0)
    );

    strictTargeting$ = this.offerTargetingWidgetQuery.select('strict_targeting');

    extendedTargeting$ = this.offerTargetingWidgetQuery.select('extended_targeting');

    readonly showStrictTargeting$: Observable<boolean> = this.getShowStrictTargeting$;

    readonly allowedDeniedIdEnum = OfferAllowedDeniedIdEnum;

    constructor(
        private readonly offerTargetingWidgetService: OfferTargetingWidgetService,
        private readonly offerTargetingWidgetQuery: OfferTargetingWidgetQuery,
        private readonly modal3: Modal3Service,
        private readonly unsubscribe: UnsubscribeService,
        private readonly translate: TranslateService,
        private readonly offerDetailQuery: OfferDetailQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        combineLatest([this.offerDetailQuery.id$, this.translate.onLangChange.pipe(startWith(''))])
            .pipe(
                filter(([id]) => !!id),
                switchMap(([id]) => this.offerTargetingWidgetService.view(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    editForm(): void {
        const ref = this.modal3.editForm(OfferTargetingEditComponent, {
            data: this.offerTargetingWidgetQuery.getValue()
        }).afterClosed$;

        ref.pipe(
            filter(({ type }) => type === Modal3CloseEventEnum.Update),
            tap(({ data }) => {
                this.offerTargetingWidgetService.updateStore(data);
            }),
            takeUntil(this.unsubscribe)
        ).subscribe();
    }

    trackByFn(index: number): number {
        return index;
    }

    trackByGeoFn(index: number, item: OfferTargetingGeoModel): string {
        return item?.code;
    }

    private get getShowStrictTargeting$(): Observable<boolean> {
        return combineLatest([this.showGeo$, this.extendedTargeting$]).pipe(
            map(([showGeo, extendedTargeting]) => showGeo || Boolean(extendedTargeting.length))
        );
    }
}
