import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportsClearTempFiltersService {
    private _clear$: Subject<void> = new Subject<void>();

    readonly clear$ = this._clear$.asObservable();

    constructor() {}

    clearTempFilters() {
        this._clear$.next();
    }
}
