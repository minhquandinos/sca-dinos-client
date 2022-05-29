import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { ConfigTableColumnClass } from '@scaleo/shared/components';

export class StatisticOptions extends ConfigTableColumnClass {
    http: HttpClient;

    constructor(http: HttpClient, public rest: RestApiService) {
        super(http);
        this.http = http;
    }

    // public configTableParameters<T>(url: string): Observable<T[]> {
    //     return this.rest.get<ApiResponse<T>>(url).pipe(map((response) => response.info['columns-list']));
    // }
}
