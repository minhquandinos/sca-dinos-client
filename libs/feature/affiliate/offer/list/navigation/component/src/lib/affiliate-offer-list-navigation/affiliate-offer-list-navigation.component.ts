import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';

import { AffiliateOfferListNavigationModel } from '../affiliate-offer-list-navigation.model';

@Component({
    selector: 'scaleo-affiliate-offer-list-navigation',
    templateUrl: './affiliate-offer-list-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateOfferListNavigationComponent {
    @HostBinding('class') hostClass = 'd-flex w-100';

    private _navCounts$ = this.platformCountsService.getCount('offers');

    readonly total$ = this._navCounts$.pipe(pluck('total'));

    readonly featured$ = this._navCounts$.pipe(pluck('featured'));

    readonly my$ = this._navCounts$.pipe(pluck('my'));

    readonly smartlink$ = this._navCounts$.pipe(pluck('smartlink'));

    readonly planFeature = PLATFORM_PLAN_FEATURE;

    constructor(private readonly platformCountsService: PlatformCountsService<AffiliateOfferListNavigationModel>) {}
}
