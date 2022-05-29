import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlatformCountsService } from '@scaleo/platform/counts/data-access';

@Injectable()
export class AffiliateOfferSmartLinkListGuard implements CanActivate {
    constructor(private platformCountsService: PlatformCountsService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.platformCountsService.getCount('offers').pipe(
            filter((counts) => !!counts || typeof counts === 'number'),
            map((counts) => {
                if (counts?.smartlink > 0) {
                    return true;
                }
                this.router.navigate(['/not-found']);
                return false;
            })
        );
    }
}
