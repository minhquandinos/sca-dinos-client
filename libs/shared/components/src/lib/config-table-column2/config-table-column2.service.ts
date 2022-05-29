import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Util } from '@scaleo/utils';

import { ConfigTableColumn2RequiredService } from './config-table-column2-required.service';
import { ConfigCheckedColumnModel, ConfigTableColumn2Model } from './models/config-table-column2.model';

@Injectable()
export class ConfigTableColumn2Service {
    private _checkedColumn$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    checkedColumn$ = this._checkedColumn$.asObservable();

    private _allColumn$: BehaviorSubject<ConfigCheckedColumnModel[]> = new BehaviorSubject<ConfigCheckedColumnModel[]>([]);

    allColumn$ = this._allColumn$.asObservable();

    private _tempCheckedColumn$: BehaviorSubject<ConfigCheckedColumnModel[]> = new BehaviorSubject<ConfigCheckedColumnModel[]>([]);

    constructor(private configTableColumn2RequiredService: ConfigTableColumn2RequiredService) {}

    // decorator for restore columns
    initCheckedColumn(configs: ConfigTableColumn2Model[]) {
        const initialColumn = [].concat(...configs.map((item) => item.items)).map((item: ConfigTableColumn2Model) => ({
            key: item.key,
            checked: Boolean(+item.default),
            reportSort: item.reportSort
        }));

        this._allColumn$.next(initialColumn);
        this.saveNewCheckedColumns();
    }

    updateCheckedColumns(key: string, checked: boolean) {
        const findColumnIndex = this.allColumn.findIndex((item) => item.key === key);
        if (findColumnIndex !== -1) {
            const newColumns = Util.cloneDeep(this.allColumn);
            newColumns[findColumnIndex].checked = checked;

            this._allColumn$.next(newColumns);
        }
    }

    saveNewCheckedColumns() {
        if (this.allColumn.length > 0) {
            const newColumns = this.allColumn
                .filter((item) => item.checked)
                .sort((a, b) => a.reportSort - b.reportSort)
                .map((item) => item.key);

            this._checkedColumn$.next(newColumns);
        }
    }

    get allColumn(): ConfigCheckedColumnModel[] {
        return this._allColumn$.value;
    }

    get checkedColumns(): string[] {
        return this._checkedColumn$.value;
    }

    public checkAllColumnsInGroup(items: ConfigTableColumn2Model[]) {
        const selectedAll = items.every(({ key }) => this.allColumn.some((column) => key === column.key && column.checked));
        [...items]
            .filter(({ key }) => !this.configTableColumn2RequiredService.isRequiredColumns(key))
            .forEach(({ key }) => {
                this.updateCheckedColumns(key, !selectedAll);
            });
    }

    clearCheckedColumn() {
        this._checkedColumn$.next([]);
    }

    setTempCheckedColumn() {
        this._tempCheckedColumn$.next(this.allColumn);
    }

    restore() {
        this._allColumn$.next(this._tempCheckedColumn$.value);
    }
}
