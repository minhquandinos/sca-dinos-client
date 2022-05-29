import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ReportStatisticsChildrenDataService } from './report-statistics-children-data.service';

@Injectable()
export class ReportStatisticsChildrenService {
    private _isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isOpen$ = this._isOpen$.asObservable();

    private _isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    isLoad$ = this._isLoad$.asObservable();

    constructor(private childrenDataService: ReportStatisticsChildrenDataService) {}

    clear(): void {
        this.childrenDataService.clearChildren();
        this.switchIsLoad();
        this.switchIsOpen();
    }

    switchIsOpen(): void {
        this._isOpen$.next(!this.isOpen);
    }

    get isOpen(): boolean {
        return this._isOpen$.value;
    }

    switchIsLoad() {
        this._isLoad$.next(!this._isLoad$.value);
    }
}
