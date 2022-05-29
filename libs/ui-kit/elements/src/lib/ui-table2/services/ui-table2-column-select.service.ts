import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SelectRowModel, UiTable2HeaderSelectAllStatusEnum, UiTable2HeaderSelectAllStatusType } from '../models/ui-table2.model';

@Injectable()
export class UiTable2ColumnSelectService {
    private _showSelect$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly showSelect$ = this._showSelect$.asObservable();

    private _singleSelect$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly singleSelect$ = this._singleSelect$.asObservable();

    private _selected$: BehaviorSubject<SelectRowModel[]> = new BehaviorSubject<any[]>(null);

    readonly selected$ = this._selected$.asObservable();

    private _selectedAll$: BehaviorSubject<UiTable2HeaderSelectAllStatusType> = new BehaviorSubject<UiTable2HeaderSelectAllStatusType>(
        null
    );

    readonly selectedAll$ = this._selectedAll$.asObservable();

    setShowSelect(value: boolean): void {
        this._showSelect$.next(value);
    }

    get showSelect(): boolean {
        return this._showSelect$.value;
    }

    setSingleSelect(value: boolean): void {
        this._singleSelect$.next(value);
    }

    get showSingleSelect(): boolean {
        return this._singleSelect$.value;
    }

    setSelected(item: SelectRowModel, updateAll = false): void {
        const find = this.selectedAllList.find((el) => el.position === item.position);

        if (!updateAll) {
            if (find) {
                this.removeFromSelected(find);
            } else {
                this.addToSelected(item);
            }
        }

        if (updateAll) {
            if (this.selectedAll === UiTable2HeaderSelectAllStatusEnum.Checked && !find) {
                this.addToSelected(item);
            }

            if (this.selectedAll === UiTable2HeaderSelectAllStatusEnum.Unchecked) {
                this.removeFromSelected(item);
            }
        }
    }

    private addToSelected(item: SelectRowModel) {
        this._selected$.next([...this.selectedAllList, item]);
    }

    private removeFromSelected(item: SelectRowModel) {
        this._selected$.next(this.selectedAllList.filter((el) => el.position !== item.position));
    }

    get selectedAllList(): SelectRowModel[] {
        return this._selected$.value || [];
    }

    setSelectedAll(status: UiTable2HeaderSelectAllStatusType): void {
        this._selectedAll$.next(status);
    }

    get selectedAll(): UiTable2HeaderSelectAllStatusType {
        return this._selectedAll$.value;
    }

    clearSelected() {
        this._selected$.next(null);
        if (!this.showSingleSelect) {
            this._selectedAll$.next(null);
        }
    }
}
