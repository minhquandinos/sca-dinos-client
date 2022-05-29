import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

import { StatisticOutputParameterInterface } from './config-table-column.model';

@Injectable()
export class ConfigTableColumnService {
    columnsTree: BehaviorSubject<UiTableHeaderInterface[]> = new BehaviorSubject<UiTableHeaderInterface[]>(null);

    private _columnsPayload$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    readonly columnsPayload$ = this._columnsPayload$.asObservable();

    selectedItem: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    clickCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    showMessageWhenMax: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    columnsRequire: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['']);

    alternativeColumnsConfigTranslateKey = 'interface.table_columns_config.';

    countSelectedItem(configs: StatisticOutputParameterInterface[]) {
        const counts = []
            .concat(...configs.map((group) => [...group.items, ...[].concat(...group.items.map((child) => child.children))]))
            .filter((column) => !!column.selected).length;

        this.selectedItem.next(counts);
    }

    get columnsPayload(): string {
        return this._columnsPayload$.value;
    }

    setColumns(columns: string): void {
        this._columnsPayload$.next(columns);
    }
}
