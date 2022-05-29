import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';

import { OfferCustomParameterCreateApi } from '../api/offer-custom-parameter-create.api';
import { OfferCustomParameterCreateDto, OfferCustomParametersFormControlModel } from '../models/offer-custom-parameter-create.model';

@Injectable()
export class OfferCustomParameterCreateService {
    constructor(private readonly api: OfferCustomParameterCreateApi, private readonly jsonConvertService: JsonConvertService) {}

    view(id: number): Observable<OfferCustomParamListModel> {
        return this.api.view(id).pipe(this.mapperDtoToModel);
    }

    create(post: OfferCustomParametersFormControlModel): Observable<OfferCustomParamListModel> {
        const payload: OfferCustomParameterCreateDto = this.mapperFormControlModelToPayloadDto(post);
        return this.api.create(payload).pipe(this.mapperDtoToModel);
    }

    update(id: number, post: OfferCustomParametersFormControlModel): Observable<OfferCustomParamListModel> {
        const payload: OfferCustomParameterCreateDto = this.mapperFormControlModelToPayloadDto(post);
        return this.api.update(id, payload).pipe(this.mapperDtoToModel);
    }

    delete(id: number): Observable<void> {
        return this.api.delete(id);
    }

    private get mapperDtoToModel() {
        return map((response) => this.jsonConvertService.mapper(OfferCustomParamListModel, response));
    }

    private mapperFormControlModelToPayloadDto(value: OfferCustomParametersFormControlModel) {
        return this.jsonConvertService.mapper(OfferCustomParameterCreateDto, value);
    }
}
