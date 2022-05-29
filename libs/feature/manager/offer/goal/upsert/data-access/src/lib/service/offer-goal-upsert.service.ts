import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { Util } from '@scaleo/utils';

import { OfferGoalCreateApi } from '../api/offer-goal-create.api';
import { OfferGoalUpsertDto, OfferGoalUpsertModel, OfferGoalUpsertPayloadDto } from '../models/offer-goal-create.model';

@Injectable()
export class OfferGoalUpsertService {
    constructor(private readonly api: OfferGoalCreateApi) {}

    private static transformToModel(value: OfferGoalUpsertDto): OfferGoalUpsertModel {
        return {
            ...value,
            is_default: Util.numToBoolean(value.is_default),
            can_remove: Util.numToBoolean(value.can_remove)
        };
    }

    view(offerId: number, goalId: number): Observable<OfferGoalUpsertModel> {
        return this.api.view(offerId, goalId).pipe(this.mapTransform());
    }

    store(offerId: number, payload: OfferGoalUpsertPayloadDto): Observable<OfferGoalUpsertModel> {
        return this.api.store(offerId, payload).pipe(this.mapTransform());
    }

    update(offerId: number, goalId: number, payload: OfferGoalUpsertPayloadDto): Observable<OfferGoalUpsertModel> {
        return this.api.update(offerId, goalId, payload).pipe(this.mapTransform());
    }

    destroy(offerId: number, goalId: number): Observable<void> {
        return this.api.destroy(offerId, goalId);
    }

    hasCpc(offerId: number): Observable<boolean> {
        return this.api.hasCpc(offerId).pipe(map((value) => Util.numToBoolean(value)));
    }

    private mapTransform(): OperatorFunction<OfferGoalUpsertDto, any> {
        return map((response) => OfferGoalUpsertService.transformToModel(response));
    }
}
