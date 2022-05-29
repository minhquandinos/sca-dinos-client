import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import { RestApiService } from '@scaleo/core/rest-api/service';
import { QueryHelper } from '@scaleo/shared/services/filters';
import { StatusesId } from '@scaleo/ui-kit/elements';

@Injectable()
export class DomainsForTrackingLinkService {
    constructor(private rest: RestApiService) {}

    public get getList$(): Observable<ShortResponseInterface[]> {
        const params = QueryHelper.filtersHttpParams({
            sortDirection: 'desc',
            sortField: 'id',
            status: StatusesId.Active
        });
        const options = {
            request: {
                params
            }
        };
        return this.rest.get<ShortResponseInterface[]>('tracking-domains', options).pipe(pluck('info', 'tracking-domains'));
    }
}
