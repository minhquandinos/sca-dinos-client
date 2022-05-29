import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferGoalUpsertDto, OfferGoalUpsertPayloadDto } from '../models/offer-goal-create.model';

@Injectable()
export class OfferGoalCreateApi {
    constructor(private readonly rest: RestApiService) {}

    store(offerId: number, payload: OfferGoalUpsertPayloadDto): Observable<OfferGoalUpsertDto> {
        return this.rest
            .post<ApiResponse<OfferGoalUpsertDto>>('offers-goal-create', payload, {
                urlParameters: { offerId }
            })
            .pipe(pluck('info', 'goal'));
    }

    view(offerId: number, goalId: number): Observable<OfferGoalUpsertDto> {
        return this.rest
            .get<ApiResponse<OfferGoalUpsertDto>>('offers-goal', { urlParameters: { offerId, goalId } })
            .pipe(pluck('info', 'goal'));
    }

    update(offerId: number, goalId: number, goal: OfferGoalUpsertPayloadDto): Observable<OfferGoalUpsertDto> {
        return this.rest
            .put<ApiResponse<OfferGoalUpsertDto>>('offers-goal', goal, {
                urlParameters: { offerId, goalId }
            })
            .pipe(pluck('info', 'goal'));
    }

    destroy(offerId: number, goalId: number): Observable<void> {
        return this.rest.delete<void>('offers-goals-delete', { urlParameters: { offerId, id: goalId } });
    }

    hasCpc(offerId: number): Observable<number> {
        return this.rest.get<boolean>('offers-has-cpc', { urlParameters: { offerId } }).pipe(pluck('info', 'has-cpc'));
    }
}
