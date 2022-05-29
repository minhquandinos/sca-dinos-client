import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import { Util } from '@scaleo/utils';

import { UiTable2ColumnsModel } from '..';
import { UiTable2HeaderColTooltipTemplateDirective } from '../directives/ui-table2-header-col-tooltip-template.directive';

@Injectable()
export class UiTable2TooltipService {
    private _tooltipTemplates$: BehaviorSubject<QueryList<UiTable2HeaderColTooltipTemplateDirective>> = new BehaviorSubject<
        QueryList<UiTable2HeaderColTooltipTemplateDirective>
    >(null);

    constructor() {}

    private get tooltipTemplates(): QueryList<UiTable2HeaderColTooltipTemplateDirective> {
        return this._tooltipTemplates$.value;
    }

    isTooltipTemplatesNotEmpty$(columnValue: string): Observable<boolean> {
        return this._tooltipTemplates$.pipe(
            filter((tooltips) => tooltips?.length > 0),
            filter((tooltips) => tooltips.some((elem) => elem.uiTable2HeaderColTooltipTemplate === columnValue)),
            mapTo(true)
        );
    }

    setTooltipTemplates(value: QueryList<UiTable2HeaderColTooltipTemplateDirective>): void {
        this._tooltipTemplates$.next(value);
    }

    appendTooltipToColumn(column: UiTable2ColumnsModel): UiTable2ColumnsModel {
        const newColumn = Util.cloneObject(column);
        const columnTooltipTemplate = this.tooltipTemplates?.find(
            (elem) => elem.uiTable2HeaderColTooltipTemplate === (newColumn.tooltipKey || newColumn.value)
        );

        if (columnTooltipTemplate) {
            return {
                ...newColumn,
                tooltipTpl: newColumn?.tooltip ? columnTooltipTemplate?.tpl : null,
                tooltipType: columnTooltipTemplate?.tooltipType
            };
        }

        return newColumn;
    }
}
