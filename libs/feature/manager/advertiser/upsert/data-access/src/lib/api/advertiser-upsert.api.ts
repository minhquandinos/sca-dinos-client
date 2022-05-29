import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';

import { AdvertiserDto, AdvertiserPayloadDto } from '../advertiser.model';

@Injectable()
export class AdvertiserUpsertApi {
    constructor(private readonly rest: RestApiService, private readonly translate: TranslateService) {}

    view(id: number): Observable<AdvertiserDto> {
        return this.rest
            .get<ApiResponse<AdvertiserDto>>('advertiser', {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'advertiser'));
    }

    update(id: number, post: AdvertiserPayloadDto): Observable<AdvertiserDto> {
        return this.rest.put<AdvertiserDto>('advertiser', post, { urlParameters: { id } }).pipe(pluck('info', 'advertiser'));
    }

    create(post: AdvertiserPayloadDto): Observable<void> {
        return this.rest.post<AdvertiserDto>('advertiser-create', post);
    }

    deleteImage(id: number): Observable<void> {
        return this.rest.delete('advertiser-delete-image', { urlParameters: { id } });
    }

    delete(id: number): Observable<void> {
        return this.rest.delete('advertiser-delete', { urlParameters: { id } });
    }

    generatePostbackToken(id: number): Observable<string> {
        return this.rest.put('advertiser-generate-postback-token', null, { urlParameters: { id } }).pipe(pluck('info', 'postback_token'));
    }
}
