import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { OfferDetailQuery, OfferDetailService } from '@scaleo/feature/manager/offer/detail/data-access';

@Injectable()
export class OfferDetailResolver implements Resolve<boolean> {
    constructor(private offerDetailService: OfferDetailService, private readonly offerDetailQuery: OfferDetailQuery) {}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.offerDetailService.setId(+route.params.id);
        this.offerDetailQuery.id$
            .pipe(
                switchMap(() => this.offerDetailService.getDefaultLandingPage$),
                take(1)
            )
            .subscribe();
        return of(true);
    }
}
