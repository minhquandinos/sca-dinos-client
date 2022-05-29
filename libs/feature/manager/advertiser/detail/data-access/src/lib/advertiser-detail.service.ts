import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AdvertiserModel, AdvertiserUpsertService } from '@scaleo/feature/manager/advertiser/upsert/data-access';

import { AdvertiserDetailStore } from './state/advertiser-detail.store';

@Injectable()
export class AdvertiserDetailService {
    constructor(
        private readonly advertiserUpsertService: AdvertiserUpsertService,
        private readonly advertiserDetailStore: AdvertiserDetailStore
    ) {}

    view(id: number): Observable<AdvertiserModel> {
        return this.advertiserUpsertService.view(id).pipe(
            tap((response) => {
                this.advertiserDetailStore.update({
                    id,
                    company_name: response.company_name
                });
            })
        );
    }
}
