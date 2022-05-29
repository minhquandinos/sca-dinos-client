import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { SmartLinkUpsertModel, SmartLinkViewModel } from './manager-smart-link-upsert.model';

@Injectable()
export class ManagerSmartLinkUpsertApi {
    constructor(private rest: RestApiService, private jsonConvertService: JsonConvertService) {}
    public view(id: number): Observable<SmartLinkViewModel> {
        return this.rest.get<SmartLinkViewModel>('smart-link-view', { urlParameters: { id } }).pipe(
            pluck('info', 'smart-links'),
            map((link) => this.jsonConvertService.mapper<SmartLinkViewModel>(SmartLinkViewModel, link))
        );
    }

    public create(smartLink: SmartLinkUpsertModel): Observable<SmartLinkUpsertModel> {
        return this.rest.post<SmartLinkUpsertModel>('smart-link-create', smartLink);
    }

    public update(id: number, smartLink: SmartLinkUpsertModel): Observable<SmartLinkUpsertModel> {
        return this.rest.put<SmartLinkUpsertModel>('smart-link-update', smartLink, {
            urlParameters: { id }
        });
    }

    public delete(id: number): Observable<void> {
        return this.rest.delete<any>('smart-link-delete', { urlParameters: { id } });
    }

    public deleteImage(id: number): Observable<void> {
        return this.rest.delete<any>('smart-link-delete-image', { urlParameters: { id } });
    }
}
