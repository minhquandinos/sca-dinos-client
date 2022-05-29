import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { filter, Observable, of, pairwise } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { AffiliateDetailQuery, AffiliateDetailService } from '@scaleo/feature/manager/affiliate/detail/data-access';
import { AffiliateDetailWidgetApi } from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';

@Injectable()
export class ManagerAccessAffiliateDetailResolver implements Resolve<boolean> {
    constructor(
        private readonly affiliateDetailService: AffiliateDetailService,
        private readonly affiliateDetailQuery: AffiliateDetailQuery,
        private readonly affiliateDetailWidgetApi: AffiliateDetailWidgetApi
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.affiliateDetailService.updateStore({
            id: +route.params.id
        });
        this.affiliateDetailQuery
            .select('id')
            .pipe(
                filter((id) => !!id),
                pairwise(),
                filter(([current, previous]) => current !== previous),
                switchMap(([id]) =>
                    this.affiliateDetailWidgetApi.view(id).pipe(
                        map((affiliate) => affiliate?.company_name || ''),
                        tap((title) => {
                            this.affiliateDetailService.updateStore({ company: title });
                        })
                    )
                ),
                take(1)
            )
            .subscribe();
        return of(true);
    }
}
