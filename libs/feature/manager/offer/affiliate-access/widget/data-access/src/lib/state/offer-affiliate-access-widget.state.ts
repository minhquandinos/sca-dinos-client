import { Injectable } from '@angular/core';
import { guid, Query, Store } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

import { OfferAffiliateAccessModel } from '../models/offer-affiliate-access.model';

type State = OfferAffiliateAccessModel;

const initialState = (): any => ({
    visible_type: undefined,
    allowed_affiliates: [],
    denied_affiliates: [],
    ask_approval_questions: BooleanEnum.False,
    questions: ''
});

@Injectable()
export class OfferAffiliateAccessWidgetStore extends Store<State> {
    constructor() {
        super(initialState(), { name: `OfferAffiliateAccessWidget-${guid()}` });
    }
}

@Injectable()
export class OfferAffiliateAccessWidgetQuery extends Query<State> {
    readonly visibility$ = this.select('visible_type');

    readonly data$ = this.select();

    constructor(protected readonly store: OfferAffiliateAccessWidgetStore) {
        super(store);
    }

    get getShowAskAffiliatesApprovalQuestions$(): Observable<boolean> {
        return combineLatest([this.visibility$, this.select('ask_approval_questions')]).pipe(
            map(([visibility, askQuestion]) => visibility === OffersVisibilityIdEnum.Require && !!askQuestion)
        );
    }
}
