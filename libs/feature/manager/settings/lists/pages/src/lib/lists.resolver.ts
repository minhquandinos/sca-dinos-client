import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    PlatformListsInterface,
    PlatformListsStatusesEnum
} from '../../../../../../../platform/list/access-data/src/lib/models/platform.lists.interface';
import { PlatformListsService } from '../../../../../../../platform/list/access-data/src/lib/platform.lists.service';

@Injectable()
export class ListsResolver implements Resolve<PlatformListsInterface> {
    constructor(private platformListsService: PlatformListsService) {}

    resolve(): Observable<PlatformListsInterface> {
        return this.platformListsService.platformListsNew('statuses').pipe(
            map((lists) => {
                const platformLists = JSON.parse(JSON.stringify(lists));

                platformLists.statuses = platformLists.statuses.filter((status) => status.id !== PlatformListsStatusesEnum.Pending);

                return platformLists;
            })
        );
    }
}
