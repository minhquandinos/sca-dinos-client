import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { RequestUtil } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';
import { FILE_EXTENSION_MIME, FileExtensionEnum } from '@scaleo/platform/data';
import { CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

import { OfferCreativeCreateApi } from '../api/offer-creative-create.api';
import { OfferCreativeFormControlModel, OfferCreativePayloadModel } from '../models/offer-creative-create.model';

@Injectable()
export class OfferCreativeCreateService {
    constructor(private readonly api: OfferCreativeCreateApi, private readonly jsonConvertService: JsonConvertService) {}

    view(id: number): Observable<ManagerOfferCreativeModel> {
        return this.api.view(id).pipe(this.mapperDtoToModel);
    }

    update(id: number, post: OfferCreativeFormControlModel): Observable<ManagerOfferCreativeModel> {
        const data = this.mapperFormControlModelToPayloadDto(post);
        return this.api.update(id, data).pipe(this.mapperDtoToModel);
    }

    create(post: OfferCreativeFormControlModel): Observable<ManagerOfferCreativeModel> {
        const data = this.mapperFormControlModel(post);
        return this.api.create(data).pipe(this.mapperDtoToModel);
    }

    delete(id: number): Observable<void> {
        return this.api.delete(id);
    }

    private get mapperDtoToModel(): OperatorFunction<any, any> {
        return map((response: ManagerOfferCreativeModel) => this.jsonConvertService.mapper(ManagerOfferCreativeModel, response));
    }

    private mapperFormControlModel(post: OfferCreativeFormControlModel): OfferCreativePayloadModel | FormData {
        const data = this.mapperFormControlModelToPayloadDto(post);
        const { source_file, type } = post;
        const zipExtension = FILE_EXTENSION_MIME[FileExtensionEnum.ZIP];
        // TODO find out why the mapper does not transform the file prop
        return type === CreativeTypesIdEnum.Banner && source_file.type === zipExtension
            ? RequestUtil.prepareFormData({
                  ...data,
                  source_file
              })
            : data;
    }

    private mapperFormControlModelToPayloadDto(formData: OfferCreativeFormControlModel): OfferCreativePayloadModel {
        return this.jsonConvertService.mapper(OfferCreativePayloadModel, formData);
    }
}
