import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ampPipe'
})
export class AmpPipe implements PipeTransform {
    transform(value: string): string {
        return value ? value.replace(/&amp;/g, '&').replace(/&#039;/g, '`') : value;
    }
}
