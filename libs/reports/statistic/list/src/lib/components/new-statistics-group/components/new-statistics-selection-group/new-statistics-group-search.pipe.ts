import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'newStatisticsGroupSearch'
})
export class NewStatisticsGroupSearchPipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform<T>(values: T[], search: string): T[] {
        const keySearch = 'key';

        if (!search) {
            return values;
        }

        if (search.length > 0) {
            return values
                .map((group: any) => ({
                    ...group,
                    items: group.items.filter((item: any) => this.translateKey(search, item[keySearch]))
                }))
                .filter((group) => group.items.length > 0);
        }

        return values;
    }

    private translateKey(search: string, key: string): boolean {
        const translateSchema = 'table.column.';
        const translate = this.translate.instant(`${translateSchema}${key}`);
        return translate.toLowerCase().includes(search.toLowerCase());
    }
}
