import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UiTable2ColumnDirectionType, UiTable2SortColumnModel, UiTable2SortModel } from '../models/ui-table2-columns.model';

@Injectable()
export class UiTable2ColumnSortService {
    private _sort$: BehaviorSubject<UiTable2SortModel> = new BehaviorSubject<UiTable2SortModel>(null);

    readonly sort$ = this._sort$.asObservable();

    readonly sort = this._sort$.value;

    private _sortDisplay$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    readonly sortDisplay$ = this._sortDisplay$.asObservable();

    setDisplaySort(display: boolean) {
        this._sortDisplay$.next(display);
    }

    get showSort(): boolean {
        return this._sortDisplay$.value;
    }

    initColumnSort(current: UiTable2SortColumnModel) {
        this._sort$.next({
            current,
            previous: {
                field: null,
                direction: 'desc'
            }
        });
    }

    updateColumnSort(field: string) {
        if (this._sort$.value) {
            const { current } = this._sort$.value;
            let newDirection: UiTable2ColumnDirectionType = current?.direction;

            if (field !== current.field) {
                newDirection = 'desc';
            } else {
                newDirection = newDirection === 'asc' ? 'desc' : 'asc';
            }

            this._sort$.next({
                current: {
                    field,
                    direction: newDirection
                },
                previous: current
            });
        }
    }
}
