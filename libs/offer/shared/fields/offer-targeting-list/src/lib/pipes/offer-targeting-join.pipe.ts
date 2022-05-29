import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'offerTargetingJoin'
})
export class OfferTargetingJoinPipe implements PipeTransform {
    transform(items: unknown[], config?: { separator?: string; key?: string }): string {
        let newItems: unknown[] = items;
        if (config?.key) {
            newItems = newItems.map((item) => item?.[config.key]);
        }
        if (config?.separator) {
            return newItems.join(config?.separator);
        }

        return Array.isArray(newItems) ? newItems?.join(', ') : '';
    }
}
