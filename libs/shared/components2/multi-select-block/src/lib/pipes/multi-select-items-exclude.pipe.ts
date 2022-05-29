import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'multiSelectItemsExclude'
})
export class MultiSelectItemsExcludePipe implements PipeTransform {
    transform(items: unknown[], exclude: unknown[], incrementKey: string): unknown[] {
        if (exclude?.length > 0) {
            return items.filter((elem) => exclude.every((elem2) => (elem as any)?.[incrementKey] !== elem2));
        }

        return items;
    }
}
