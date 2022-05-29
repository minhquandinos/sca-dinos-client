import { Pipe, PipeTransform } from '@angular/core';

import { ArrayUtil } from '@scaleo/utils';

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform<T>(items: T[], delimiter: string = ', ', key?: keyof T): string {
        return ArrayUtil.join(items, delimiter, key) || '';
    }
}
