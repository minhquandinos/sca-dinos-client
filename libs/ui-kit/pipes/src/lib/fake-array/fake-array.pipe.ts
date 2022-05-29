import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uiFakeArray'
})
export class FakeArrayPipe implements PipeTransform {
    transform(count: number): unknown {
        const indexes = [];
        for (let i = 0; i < count; i++) {
            indexes.push(i);
        }
        return indexes;
    }
}
