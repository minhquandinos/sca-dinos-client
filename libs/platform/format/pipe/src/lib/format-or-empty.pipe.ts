import { Pipe, PipeTransform } from '@angular/core';

import { TransformFormatType } from '@scaleo/platform/format/models';

import { FormatPipe } from './format.pipe';

@Pipe({
    name: 'formatOrEmpty'
})
export class FormatOrEmptyPipe implements PipeTransform {
    constructor(private formatPipe: FormatPipe) {}

    transform(
        value: string | number,
        format: TransformFormatType,
        contains?: string[] | number[] | string | number,
        emptyValue?: string
    ): string | number {
        if (contains) {
            if (this.isEmpty(value, contains)) {
                return emptyValue;
            }
        }

        return this.formatPipe.transform(value, format);
    }

    private isEmpty(value: string | number, contains?: string[] | number[] | string | number): boolean {
        if (Array.isArray(contains)) {
            return contains.some((elem) => elem === value);
        }

        return value === contains;
    }
}
