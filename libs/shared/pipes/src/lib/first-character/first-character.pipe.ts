import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstCharacter'
})
export class FirstCharacterPipe implements PipeTransform {
    transform(value: string): string {
        return value?.charAt(0);
    }
}
