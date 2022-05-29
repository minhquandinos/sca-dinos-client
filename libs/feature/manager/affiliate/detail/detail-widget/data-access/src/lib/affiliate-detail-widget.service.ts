import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { DateFormatService } from '@scaleo/platform/format/service';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Util } from '@scaleo/utils';

import { AffiliateDetailWidgetApi } from './affiliate-detail-widget.api';
import { AffiliateDetailWidgetModel } from './affiliate-detail-widget.model';

@Injectable()
export class AffiliateDetailWidgetService {
    constructor(
        private readonly api: AffiliateDetailWidgetApi,
        private readonly dateFormatService: DateFormatService,
        private readonly pathFileService: PathFileService
    ) {}

    view(id: number): Observable<AffiliateDetailWidgetModel> {
        return this.api.view(id).pipe(
            map((affiliate) => {
                const newAffiliate = Util.cloneDeep(affiliate);

                newAffiliate.managers_assigned = this.pathFileService.appendPathToEntity(newAffiliate?.managers_assigned, 'image', 'users');

                newAffiliate.created = this.dateFormatService.format(+newAffiliate.created);
                newAffiliate.visited = this.dateFormatService.format(+newAffiliate.visited);
                newAffiliate.activity = this.dateFormatService.format(+newAffiliate.activity);

                return newAffiliate;
            })
        );
    }
}
