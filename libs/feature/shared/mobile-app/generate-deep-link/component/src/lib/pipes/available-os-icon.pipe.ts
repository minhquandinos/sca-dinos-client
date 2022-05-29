import { Pipe, PipeTransform } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { DetectedClientDeviceEnum } from '@scaleo/core/detected-clinet-device/service';

@Pipe({
    name: 'availableOsIcon'
})
export class AvailableOsIconPipe implements PipeTransform {
    transform(os: DetectedClientDeviceEnum): string {
        const iconsMap: BaseObjectModel = {
            [DetectedClientDeviceEnum.IOS]: 'ic_ios',
            [DetectedClientDeviceEnum.Android]: 'ic_android'
        };
        return iconsMap[os];
    }
}
