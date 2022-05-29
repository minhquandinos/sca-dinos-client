import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
    transform(value: string, limit = 25, completeWords = false, ellipsis = '…'): string {
        if (limit && value?.length > 0) {
            if (completeWords) {
                limit = value.substr(0, limit).lastIndexOf(' ');
            }
            return value.length > limit ? value.substr(0, limit) + ellipsis : value;
        }
        return value;
    }
}
