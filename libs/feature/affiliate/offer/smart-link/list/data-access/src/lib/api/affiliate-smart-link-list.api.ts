import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { SmartLinksApi } from '@scaleo/offer/smart-link/list/data-access';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Util } from '@scaleo/utils';

import { AffiliateOfferSmartLinkListModel, AffiliateOfferSmartLinkListQueryParamsModel } from '../affiliate-offer-smart-link-list.model';

@Injectable()
export class AffiliateSmartLinkListApi {
    constructor(
        private api: SmartLinksApi,
        private readonly jsonConvertService: JsonConvertService,
        private readonly pathFileService: PathFileService
    ) {}

    index(
        queryParams?: AffiliateOfferSmartLinkListQueryParamsModel
    ): Observable<ApiResponseWithPagination<AffiliateOfferSmartLinkListModel[]>> {
        return this.api.index<AffiliateOfferSmartLinkListModel, AffiliateOfferSmartLinkListQueryParamsModel>(queryParams).pipe(
            map(({ pagination, results }) => {
                const smartLinks = results.map((link: AffiliateOfferSmartLinkListModel) =>
                    Util.cloneObject(link, { image: this.pathFileService.platformImage(link.image, 'offers') })
                );
                return {
                    pagination,
                    results: this.jsonConvertService.mapper(AffiliateOfferSmartLinkListModel, smartLinks)
                };
            })
        );
    }
}
