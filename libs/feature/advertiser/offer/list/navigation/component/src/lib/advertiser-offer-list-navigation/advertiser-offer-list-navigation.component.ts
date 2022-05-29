import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { PlatformCountsService } from '@scaleo/platform/counts/data-access';

import { AdvertiserOfferListNavigationModel } from '../advertiser-offer-list-navigation.model';

@Component({
    selector: 'scaleo-advertiser-offer-list-navigation',
    templateUrl: './advertiser-offer-list-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserOfferListNavigationComponent {
    @HostBinding('class') hostClass = 'd-flex w-100';

    private _navCounts$ = this.platformCountsService.getCount('offers');

    readonly total$ = this._navCounts$.pipe(pluck('total'));

    constructor(private readonly platformCountsService: PlatformCountsService<AdvertiserOfferListNavigationModel>) {}
}
