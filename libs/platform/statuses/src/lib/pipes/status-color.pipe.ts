import { Pipe, PipeTransform } from '@angular/core';

import { ScaleoStatusesType } from '@scaleo/platform/list/access-data';

import { statusColor2Creator } from '../const/status-color2.const';

@Pipe({
    name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
    transform(value: string | number, type: keyof Record<ScaleoStatusesType, string>): string {
        const color = statusColor2Creator(type, value);
        return color.makeColor();
    }
}
