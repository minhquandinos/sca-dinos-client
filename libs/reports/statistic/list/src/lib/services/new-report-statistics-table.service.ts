import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NewReportStatisticsTableService {
    private _update$: Subject<void> = new Subject<void>();

    update$ = this._update$.asObservable();

    update(): void {
        setTimeout(() => {
            this._update$.next();
        }, 0);
    }
}
