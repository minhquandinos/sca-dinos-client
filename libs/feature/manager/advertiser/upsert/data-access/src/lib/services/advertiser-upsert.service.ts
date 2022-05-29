import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListQuery, PlatformListsFormatInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { AdvertiserDto, AdvertiserFormControlModel, AdvertiserModel, AdvertiserPayloadDto } from '../advertiser.model';
import { AdvertiserUpsertApi } from '../api/advertiser-upsert.api';

@Injectable()
export class AdvertiserUpsertService {
    constructor(
        private readonly platformListsService: PlatformListsService,
        private readonly api: AdvertiserUpsertApi,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly platformListQuery: PlatformListQuery,
        private readonly pathFile: PathFileService,
        private readonly jsonConvertService: JsonConvertService
    ) {}

    view(id: number): Observable<AdvertiserModel> {
        return forkJoin([this.api.view(id), this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))]).pipe(
            map(([advertiser, messengers]) => {
                return this.transformDtoToModel(advertiser, messengers);
            })
        );
    }

    create(post: AdvertiserFormControlModel): Observable<unknown> {
        const newPost = this.transformFormControlToPayloadDto(post);
        return this.api.create(newPost);
    }

    update(id: number, post: AdvertiserFormControlModel): Observable<AdvertiserModel> {
        const newPost = this.transformFormControlToPayloadDto(post);
        return this.api.update(id, newPost).pipe(map((advertiser) => this.transformDtoToModel(advertiser)));
    }

    deleteImage(id: number): Observable<void> {
        return this.api.deleteImage(id);
    }

    delete(id: number): Observable<void> {
        return this.api.delete(id);
    }

    generatePostbackToken(id: number): Observable<string> {
        return this.api.generatePostbackToken(id);
    }

    private transformFormControlToPayloadDto(post: AdvertiserFormControlModel): AdvertiserPayloadDto {
        return this.jsonConvertService.mapper(AdvertiserPayloadDto, post);
    }

    private transformDtoToModel(advertiser: AdvertiserDto, messengers?: PlatformListsFormatInterface[]): AdvertiserModel {
        const mapper: AdvertiserModel = this.jsonConvertService.mapper(AdvertiserModel, advertiser) as AdvertiserModel;
        const data: AdvertiserModel = { ...mapper };

        const contacts = new ContactAdapter(data.contacts, messengers || this.platformListQuery.getValue()?.messengers);

        return {
            ...data,
            contacts: contacts.transform(),
            managers_assigned: this.pathFile.appendPathToEntity(data?.managers_assigned, 'image', 'users'),
            image: this.pathFile.platformImage(data.image, 'advertisers')
        };
    }
}
