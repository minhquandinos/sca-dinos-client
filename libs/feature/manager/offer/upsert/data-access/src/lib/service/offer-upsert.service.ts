import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { OfferDetailViewModel } from '@scaleo/feature/manager/offer/detail/widget/data-access';

import { OfferUpsertApi } from '../api/offer-upsert.api';
import { OfferFormDataDto, OfferPayloadModel } from '../models/offer-upsert.model';

@Injectable()
export class OfferUpsertService {
    constructor(private readonly api: OfferUpsertApi, private readonly jsonConvertService: JsonConvertService) {}

    view(id: number): Promise<OfferDetailViewModel> {
        return firstValueFrom(this.api.view(id));
    }

    create(formData: OfferFormDataDto): Promise<void> {
        const data = this.transformOfferControlValueDto(formData);
        return firstValueFrom(this.api.create(data));
    }

    update(id: number, formData: OfferFormDataDto): Promise<OfferDetailViewModel> {
        const data = this.transformOfferControlValueDto(formData);
        return firstValueFrom<OfferDetailViewModel>(this.api.update(id, data));
    }

    delete(id: number): Observable<void> {
        return this.api.delete(id);
    }

    deleteImage(id: number): Promise<void> {
        return firstValueFrom(this.api.deleteImage(id));
    }

    private transformOfferControlValueDto(formData: OfferFormDataDto): OfferPayloadModel {
        return this.jsonConvertService.mapper(OfferPayloadModel, formData);
    }
}
