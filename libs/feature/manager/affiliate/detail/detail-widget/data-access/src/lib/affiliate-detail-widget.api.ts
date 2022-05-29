import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { AffiliateDetailWidgetModel } from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { PathFileService } from '@scaleo/shared/services/path-file';

@Injectable({
    providedIn: 'root'
})
export class AffiliateDetailWidgetApi {
    constructor(
        private readonly rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformListsService: PlatformListsService,
        private readonly pathFileService: PathFileService
    ) {}

    view(id: number): Observable<AffiliateDetailWidgetModel> {
        return forkJoin([
            this.rest
                .get<ApiResponse<AffiliateDetailWidgetModel>>('affiliate-view', {
                    urlParameters: { id }
                })
                .pipe(pluck('info', 'affiliate')),
            this.platformListsService.platformListsNew('messengers').pipe(pluck('messengers'))
        ]).pipe(
            map(([affiliate, messengers]) => {
                const mapper = this.jsonConvertService.mapper(AffiliateDetailWidgetModel, affiliate);
                const contacts = new ContactAdapter(mapper.contacts, messengers);
                mapper.contacts = contacts.transform();
                mapper.image = this.pathFileService.platformImage(mapper.image, 'affiliates');
                return mapper;
            })
        );
    }
}
