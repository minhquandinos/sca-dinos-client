import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { ConfigTableColumn2Model } from '../models/config-table-column2.model';

export const getConfigTableColumnsUtil = (rest: RestApiService, url: string): Observable<ConfigTableColumn2Model[]> =>
    rest.get(url).pipe(pluck('info', 'columns-list'));
