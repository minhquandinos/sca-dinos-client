import { Injectable } from '@angular/core';
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CustomDateRangePickerService {
    private _picker: DaterangepickerComponent;

    private _picker$: Subject<DaterangepickerComponent> = new Subject<DaterangepickerComponent>();

    constructor() {}

    set picker(picker: DaterangepickerComponent) {
        this._picker = picker;
    }

    get picker(): DaterangepickerComponent {
        return this._picker;
    }

    get datePicker(): any {
        return this._picker?.datePicker;
    }

    set picker$(picker: DaterangepickerComponent | unknown) {
        this._picker$.next(picker as DaterangepickerComponent);
    }

    get picker$(): Observable<DaterangepickerComponent> {
        return this._picker$.asObservable();
    }
}
