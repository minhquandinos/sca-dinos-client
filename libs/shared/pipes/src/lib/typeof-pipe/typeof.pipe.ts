import { Pipe, PipeTransform } from '@angular/core';

type TypeofType = 'string' | 'array' | 'object' | 'number' | 'function' | 'symbol';

@Pipe({
    name: 'typeof'
})
export class TypeofPipe implements PipeTransform {
    transform(value: any, conditionType: TypeofType): boolean {
        switch (conditionType) {
            case 'array':
                return Array.isArray(value);
            default:
                return typeof value === conditionType;
        }
    }
}
