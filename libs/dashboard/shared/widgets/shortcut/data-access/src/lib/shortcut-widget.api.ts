import { Injectable } from '@angular/core';
import { map, Observable, pluck } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { ShortcutSearchItemModel } from '@scaleo/dashboard/shared/widgets/shortcut/data-access';

@Injectable()
export class ShortcutWidgetApi {
    constructor(private rest: RestApiService, private jsonConvertService: JsonConvertService) {}

    affiliate(id: number): Observable<ShortcutSearchItemModel> {
        return this.rest.get('affiliate-view', { urlParameters: { id } }).pipe(
            pluck('info', 'affiliate'),
            map((data) => {
                return this.jsonConvertService.mapper(ShortcutSearchItemModel, data);
            })
        );
    }

    advertiser(id: number): Observable<ShortcutSearchItemModel> {
        return this.rest.get('advertiser', { urlParameters: { id } }).pipe(
            pluck('info', 'advertiser'),
            map((data) => {
                return this.jsonConvertService.mapper(ShortcutSearchItemModel, data);
            })
        );
    }

    offer(id: number): Observable<ShortcutSearchItemModel> {
        return this.rest.get('offer-view', { urlParameters: { id } }).pipe(
            pluck('info', 'details'),
            map((data) => {
                return this.jsonConvertService.mapper(ShortcutSearchItemModel, data);
            })
        );
    }
}
