import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ShortcutWidgetApi } from './shortcut-widget.api';
import { ShortcutSearchItemModel } from './shortcut-widget.model';

@Injectable()
export class ShortcutWidgetService {
    constructor(private api: ShortcutWidgetApi) {}

    affiliate(id: number): Observable<ShortcutSearchItemModel> {
        return this.api.affiliate(id);
    }

    advertiser(id: number): Observable<ShortcutSearchItemModel> {
        return this.api.advertiser(id);
    }

    offer(id: number): Observable<ShortcutSearchItemModel> {
        return this.api.offer(id);
    }
}
