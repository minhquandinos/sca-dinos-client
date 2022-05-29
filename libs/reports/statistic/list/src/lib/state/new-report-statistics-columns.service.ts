import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsQuery } from './new-report-statistics.query';
import { NewReportStatisticsState, NewReportStatisticsStore } from './new-report-statistics.store';

@Injectable()
export class NewReportStatisticsColumnsService {
    constructor(private store: NewReportStatisticsStore, private query: NewReportStatisticsQuery) {}

    get tableColumnsTree$(): Observable<UiTableHeaderInterface[]> {
        return this.query.select(({ data: { tableColumnsTree } }) => tableColumnsTree);
    }

    get tableColumnsTree(): UiTableHeaderInterface[] {
        return this.query.getValue().data.tableColumnsTree;
    }

    updateStatisticTableColumnsTree(tableColumnsTree?: NewReportStatisticsState['statistic']['tableColumnsTree']) {
        this.store.update((state) => {
            const columns = tableColumnsTree || state.data.tableColumnsTree;
            return {
                data: {
                    ...state.data,
                    tableColumnsTree: [...columns]
                }
            };
        });
        this.setRequestFilter();
    }

    private get prepareColumnsToFilter(): string[] {
        return [].concat(...this.tableColumnsTree.map((head) => head.children)).map((head) => head.value);
    }

    private setRequestFilter() {
        const columns = this.prepareColumnsToFilter.join(',');
        this.store.updateFilterColumns(columns);
        // this.storeRoleUiService.set<StoreReportStatisticsModel>(ReportPagesEnum.Statistics, { columns });
    }
}
