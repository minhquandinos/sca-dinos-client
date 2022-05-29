import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customReplace'
})
export class CustomReplacePipe implements PipeTransform {
    constructor() {}

    transform(value: string, searchValue, replaceValue: string = ''): string {
        return value.replace(searchValue, replaceValue);
    }
}
