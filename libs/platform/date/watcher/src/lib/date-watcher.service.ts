import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { DateUtil } from '@scaleo/platform/date/util';

@Injectable({
    providedIn: 'root'
})
export class DateWatcherService {
    private _dateUpdated$: Subject<void> = new Subject<void>();

    readonly dateUpdated$ = this._dateUpdated$.asObservable();

    private _now$: BehaviorSubject<any> = new BehaviorSubject(DateUtil.now());

    readonly now$ = this._now$.asObservable();

    constructor() {}

    setNowDate(date: string): void {
        if (date) {
            this._now$.next(date);
            this._dateUpdated$.next();
        }
    }
}
