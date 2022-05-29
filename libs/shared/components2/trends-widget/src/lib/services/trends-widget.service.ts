import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DayPresetChangedModel } from '@scaleo/shared/components';

@Injectable()
export class TrendsWidgetService {
    private _update$: BehaviorSubject<DayPresetChangedModel> = new BehaviorSubject<DayPresetChangedModel>(null);

    readonly update$ = this._update$.asObservable();

    updateActiveComponent(value: DayPresetChangedModel) {
        this._update$.next({ ...value });
    }

    get selectedPreset(): DayPresetChangedModel {
        return this._update$.value;
    }
}
