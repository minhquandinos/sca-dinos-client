import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { AffiliateUpsertModel, AffiliateUpsertPayloadDto } from './affiliate-upsert.model';

@Injectable()
export class AffiliateUpsertApi {
    constructor(
        private translate: TranslateService,
        private readonly pathFileService: PathFileService,
        private env: EnvService,
        private platformSettingsQuery: PlatformSettingsQuery,
        private rest: RestApiService,
        private jsonConvertService: JsonConvertService,
        private platformListsService: PlatformListsService
    ) {}

    view(id: number): Observable<AffiliateUpsertModel> {
        return forkJoin([
            this.rest
                .get<ApiResponse<AffiliateUpsertModel>>('affiliate-view', {
                    urlParameters: { id }
                })
                .pipe(pluck('info', 'affiliate')),
            this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))
        ]).pipe(
            map(([affiliate, messengers]) => {
                const mapper = this.jsonConvertService.mapper(AffiliateUpsertModel, affiliate);
                const contacts = new ContactAdapter(mapper.contacts, messengers);
                mapper.contacts = contacts.transform();
                mapper.image = this.pathFileService.platformImage(mapper.image, 'affiliates');
                return mapper;
            })
        );
    }

    create(post: AffiliateUpsertPayloadDto): Observable<AffiliateUpsertModel> {
        return this.rest.post<AffiliateUpsertModel>('affiliate-create', post);
    }

    update(id: number, post: AffiliateUpsertPayloadDto): Observable<AffiliateUpsertModel> {
        return this.rest.put<AffiliateUpsertModel>('affiliate-update', post, { urlParameters: { id } });
    }

    delete(id: number): Observable<void> {
        return this.rest.delete<void>('affiliate-delete', { urlParameters: { id } });
    }

    deleteImage(id: number): Observable<void> {
        return this.rest.delete<void>('affiliate-delete-image', { urlParameters: { id } });
    }
}
