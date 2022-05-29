import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'positiveNegative'
})
export class PositiveNegativePipe implements PipeTransform {
    transform(value: any): any {
        const number = parseFloat(value);
        if (typeof +number === 'number') {
            return +number > 0 ? `+${value}` : value;
        }
        return value;
    }
}
