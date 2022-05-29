import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UiTable2CustomColumnTranslate } from '..';

@Injectable()
export class UiTable2ColumnTranslateService {
    private _customTranslate$: BehaviorSubject<UiTable2CustomColumnTranslate> = new BehaviorSubject<UiTable2CustomColumnTranslate>(null);

    readonly customTranslate$ = this._customTranslate$.asObservable();

    setCustomTranslate(value: UiTable2CustomColumnTranslate) {
        this._customTranslate$.next(value);
    }
}
