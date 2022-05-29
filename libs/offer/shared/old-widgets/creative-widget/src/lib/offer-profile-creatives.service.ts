import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';

@Injectable()
export class OfferProfileCreativesService {
    constructor(private rest: RestApiService) {}

    public downloadXMLFile(offerId: number, creativeId: number): Observable<HttpResponse<ArrayBuffer>> {
        return this.rest.get<HttpResponse<ArrayBuffer>>('offers-get-xml-feed-creative', {
            urlParameters: { offerId, creativeId },
            request: {
                observe: 'response',
                responseType: 'arrayBuffer'
            }
        });
    }
}
