import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reportFilterCountSelected'
})
export class ReportFilterCountSelectedPipe implements PipeTransform {
    transform(value: unknown): number {
        if (Array.isArray(value)) {
            return value.length;
        }

        if (value && typeof value === 'string') {
            return value.split('\n').length;
        }

        return null;
    }
}
