import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { OfferRequestType } from '@scaleo/feature/manager/offer/request/solve/data-access';

@Injectable()
export class OfferRequestControlService {
    private _actionClick$: BehaviorSubject<OfferRequestType> = new BehaviorSubject<OfferRequestType>(null);

    readonly actionClick$ = this._actionClick$.asObservable();

    set actionClick(type: OfferRequestType) {
        this._actionClick$.next(type);
    }
}
