import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ManagerAdvertisersAccessPageService } from '@scaleo/feature/manager/advertiser/services';
import { PlatformCountsAdvertiserModel, PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_TOKEN } from '@scaleo/platform-permission-plan-common';

@Component({
    selector: 'scaleo-manager-access-advertisers-navigation',
    templateUrl: './manager-access-advertisers-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerAccessAdvertisersNavigationComponent {
    @HostBinding('class') hostClass = 'd-flex w-100';

    private _navCounts$: Observable<PlatformCountsAdvertiserModel> = this.platformCountsService.counts$.pipe(
        map((counts) => counts?.advertisers || {})
    );

    readonly total$ = this._navCounts$.pipe(pluck('total'));

    readonly my$ = this._navCounts$.pipe(pluck('assigned'));

    readonly pending$ = this._navCounts$.pipe(pluck('pending'));

    readonly showAllTab$: Observable<boolean> = this.accessPage.showAllPage$;

    readonly showMyTab$: Observable<boolean> = this.accessPage.showMyPage$;

    constructor(
        private readonly platformCountsService: PlatformCountsService,
        private readonly accessPage: ManagerAdvertisersAccessPageService,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}
}
