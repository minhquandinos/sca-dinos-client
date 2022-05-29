import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferGoalsWidgetState, OfferGoalsWidgetStore } from './offer-goals-widget.store';

@Injectable()
export class OfferGoalsWidgetQuery extends BaseEntityQuery<OfferGoalsWidgetState> {
    constructor(protected store: OfferGoalsWidgetStore) {
        super(store);
    }
    //
    // get items$() {
    //     return this.select('items').pipe(
    //         map((items) => items.slice(0, 10)),
    //         map((items) => ArrayUtil.orderBy(items, 'status', 'asc'))
    //     );
    // }
    //
    // get notFound$(): Observable<boolean> {
    //     return combineLatest([this.select('total'), this.selectLoading()]).pipe(map(([total, loading]) => total <= 0 && !loading));
    // }
}
