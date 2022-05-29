import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
    MANAGER_OFFER_LIST_NAVIGATION_COUNT_PROVIDER,
    MANAGER_OFFER_LIST_NAVIGATION_COUNT_TOKEN,
    ManagerOfferListNavigationCountInterface
} from '@scaleo/feature/manager/offer/list/navigation/service';
import { PlatformCountsOfferModel } from '@scaleo/platform/counts/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';

@Component({
    selector: 'scaleo-manager-offer-list-navigation',
    templateUrl: './manager-offer-list-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_OFFER_LIST_NAVIGATION_COUNT_PROVIDER]
})
export class ManagerOfferListNavigationComponent implements OnInit {
    @HostBinding('class') hostClass = 'd-flex w-100';

    private _navCounts$: Observable<PlatformCountsOfferModel> = this.managerOfferListNavigationService.navCounts$;

    readonly total$ = this._navCounts$.pipe(pluck('total'));

    readonly featured$ = this._navCounts$.pipe(pluck('featured'));

    readonly request$ = this._navCounts$.pipe(pluck('pending-requests'));

    readonly requestIsNotEmpty$: Observable<boolean> = this.request$.pipe(map((requests) => requests > 0));

    readonly smartlink$ = this._navCounts$.pipe(pluck('smartlink'));

    readonly planFeature = PLATFORM_PLAN_FEATURE;

    constructor(
        @Inject(MANAGER_OFFER_LIST_NAVIGATION_COUNT_TOKEN)
        private readonly managerOfferListNavigationService: ManagerOfferListNavigationCountInterface<PlatformCountsOfferModel>,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit() {
        // if (!this.planPermissions.allowSmartLink) {
        //     this.offersLayoutComponent.createContainer(this.upgradeContainer, OffersLayoutContainersEnum.Upgrade);
        // }
    }
}
