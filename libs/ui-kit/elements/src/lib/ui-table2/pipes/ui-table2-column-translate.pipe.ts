import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UiTable2ColumnsModel } from '../models/ui-table2-columns.model';
import { UiTable2ColumnTranslateService } from '../services/ui-table2-column-translate.service';

@Pipe({
    name: 'uiTable2ColumnTranslate'
})
export class UiTable2ColumnTranslatePipe implements PipeTransform {
    constructor(private columnTranslateService: UiTable2ColumnTranslateService, private translate: TranslateService) {}

    transform(column: UiTable2ColumnsModel): Observable<string> {
        const defaultSchema = column.translate;

        return this.columnTranslateService.customTranslate$.pipe(
            map((items) => items?.[column?.value] || defaultSchema),
            switchMap((schema) => this.translate.stream(schema))
        );
    }
}
