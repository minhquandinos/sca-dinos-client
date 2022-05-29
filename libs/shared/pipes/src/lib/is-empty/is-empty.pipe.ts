import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isEmpty'
})
export class IsEmptyPipe implements PipeTransform {
    transform(value: string | number, contains?: string | number): boolean {
        if (contains) {
            return value === contains;
        }

        return !!value;
    }
}
