import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { OfferDetailService } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';

import { OfferLandingPageUpsertApi } from '../api/offer-landing-page-upsert.api';
import { OfferLandingPageUpsertModel, OfferLandingPageUpsertPayloadDto } from '../models/offer-landing-page-upsert.model';
import { OfferLandingPageUpsertFormControlModel } from '../models/offer-landing-page-upsert-form-control';

@Injectable()
export class OfferLandingPageUpsertService {
    constructor(
        private readonly api: OfferLandingPageUpsertApi,
        private readonly jsonConvertService: JsonConvertService,
        private readonly offerDetailService: OfferDetailService
    ) {}

    store(value: OfferLandingPageUpsertFormControlModel): Observable<OfferLandingPageModel> {
        const payload: OfferLandingPageUpsertPayloadDto = this.mapperFormControlModelToPayloadDto(value);
        return this.api.store(payload).pipe(this.mapperDtoToModel);
    }

    view(id: number): Observable<OfferLandingPageUpsertModel> {
        return this.api.view(id).pipe(map((response) => this.jsonConvertService.mapper(OfferLandingPageUpsertModel, response)));
    }

    update(id: number, value: OfferLandingPageUpsertFormControlModel, isDefault: boolean = false): Observable<OfferLandingPageModel> {
        const payload: OfferLandingPageUpsertPayloadDto = this.mapperFormControlModelToPayloadDto(value);
        return this.api.update(id, payload).pipe(
            this.mapperDtoToModel,
            tap((data: OfferLandingPageModel) => {
                if (isDefault) {
                    const { preview = undefined, url = undefined, title = undefined } = data || {};
                    this.offerDetailService.updateDefaultLandingPage({ preview, url, title });
                }
            })
        );
    }

    delete(id: number): Observable<unknown> {
        return this.api.delete(id);
    }

    private get mapperDtoToModel() {
        return map((response) => this.jsonConvertService.mapper(OfferLandingPageModel, response));
    }

    private mapperFormControlModelToPayloadDto(value: OfferLandingPageUpsertFormControlModel) {
        return this.jsonConvertService.mapper(OfferLandingPageUpsertPayloadDto, value);
    }
}
