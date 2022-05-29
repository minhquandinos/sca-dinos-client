import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UnitsType } from '@scaleo/core/data';

@Injectable()
export class UiDropdownContentService {
    private _width$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    private _height$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    private _widthUnits$: BehaviorSubject<UnitsType> = new BehaviorSubject<UnitsType>('px');

    private _heightUnits$: BehaviorSubject<UnitsType> = new BehaviorSubject<UnitsType>('px');

    setHeight(value: number) {
        this._width$.next(value);
    }

    setHeightUnits(value: UnitsType) {
        this._heightUnits$.next(value);
    }

    get heightUnits(): UnitsType {
        return this._heightUnits$.value;
    }

    get height(): number {
        return this._height$.value;
    }

    setWidth(value: number) {
        this._width$.next(value);
    }

    setWidthUnits(value: UnitsType) {
        this._widthUnits$.next(value);
    }

    get width(): number {
        return this._width$.value;
    }

    get widthUnits(): UnitsType {
        return this._widthUnits$.value;
    }
}
