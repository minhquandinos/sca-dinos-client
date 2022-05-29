import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pregMatch'
})
export class PregMatchPipe implements PipeTransform {
    transform(value: string, type: 'number'): any {
        if (value) {
            switch (type) {
                case 'number':
                    // eslint-disable-next-line no-case-declarations
                    const num = value.match(/\d+/g);
                    return num ? +num.shift() : '';
                default:
                    return value;
            }
        }
        return value;
    }
}
