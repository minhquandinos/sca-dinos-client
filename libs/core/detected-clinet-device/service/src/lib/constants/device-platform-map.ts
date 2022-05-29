import { Platform } from '@angular/cdk/platform';

import { DetectedClientDeviceEnum } from '../detected-client-device.enum';

export const devicePlatformMap: { [key: string]: typeof Platform } = {
    [DetectedClientDeviceEnum.Chrome]: Platform
};
