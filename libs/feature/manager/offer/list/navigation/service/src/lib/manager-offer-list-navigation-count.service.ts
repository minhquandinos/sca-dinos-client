import { Injectable } from '@angular/core';

import { PlatformCountsService } from '@scaleo/platform/counts/data-access';

import { ManagerOfferListNavigationCountInterface } from './manager-offer-list-navigation-count.interface';

@Injectable()
export class ManagerOfferListNavigationCountService implements ManagerOfferListNavigationCountInterface {
    private _navCounts$ = this.platformCountsService.getCount('offers');

    readonly navCounts$ = this._navCounts$;

    constructor(protected platformCountsService: PlatformCountsService) {}

    getCounts(): void {
        this.platformCountsService.update();
    }
}
