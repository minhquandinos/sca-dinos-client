import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { OfferDefaultLandingPageApi } from './offer-default-landing-page.api';
import { OfferDefaultLandingPageModel } from './offer-default-landing-page.model';

@Injectable({
    providedIn: 'root'
})
export class OfferDefaultLandingPageService {
    constructor(private readonly api: OfferDefaultLandingPageApi, private readonly toastr: ToastrBarService) {}

    get get$(): Observable<OfferDefaultLandingPageModel> {
        return this.api.getDefaultOfferUrl$.pipe(
            catchError((error) => {
                this.toastr.exception(error?.message);
                return throwError(error);
            })
        );
    }
}
