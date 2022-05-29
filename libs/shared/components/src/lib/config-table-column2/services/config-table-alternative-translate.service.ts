import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable } from 'rxjs';

import { UiTable2CustomColumnTranslate } from '@scaleo/ui-kit/elements';

@Injectable()
export class ConfigTableAlternativeTranslateService {
    private _groupTranslate$: BehaviorSubject<UiTable2CustomColumnTranslate> = new BehaviorSubject<UiTable2CustomColumnTranslate>(null);

    readonly groupTranslate$ = this._groupTranslate$.asObservable();

    private _itemTranslate$: BehaviorSubject<UiTable2CustomColumnTranslate> = new BehaviorSubject<UiTable2CustomColumnTranslate>(null);

    readonly itemTranslate$ = this._itemTranslate$.asObservable();

    translate$(type: 'key' | 'item'): Observable<UiTable2CustomColumnTranslate> {
        return defer(() => (type === 'key' ? this.groupTranslate$ : this.itemTranslate$));
    }

    setGroupTranslate(value: UiTable2CustomColumnTranslate) {
        this._groupTranslate$.next(value);
    }

    setItemTranslate(value: UiTable2CustomColumnTranslate) {
        this._itemTranslate$.next(value);
    }
}
