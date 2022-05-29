import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Filters2Service {
    private _selectedFilters: any[];

    private _appliedFilters$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor() {
        // this._appliedFilters$.pipe().subscribe(() => {});
    }
}
