import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

import { DetectedClientDeviceEnum } from './detected-client-device.enum';

@Injectable({
    providedIn: 'root'
})
export class DetectedClientDeviceService {
    readonly isBrowser = this.platform.isBrowser;

    constructor(private platform: Platform) {}

    get isNative(): boolean {
        return this.platform.ANDROID || this.platform.IOS;
    }

    isDevice(platform: DetectedClientDeviceEnum): boolean {
        const devicePlatformMap: Record<DetectedClientDeviceEnum, keyof Platform> = {
            [DetectedClientDeviceEnum.Chrome]: 'BLINK',
            [DetectedClientDeviceEnum.EDGE]: 'EDGE',
            [DetectedClientDeviceEnum.IE]: 'TRIDENT',
            [DetectedClientDeviceEnum.Firefox]: 'FIREFOX',
            [DetectedClientDeviceEnum.Safari]: 'SAFARI',
            [DetectedClientDeviceEnum.WebKit]: 'WEBKIT',
            [DetectedClientDeviceEnum.IsBrowser]: 'isBrowser',
            [DetectedClientDeviceEnum.IOS]: 'IOS',
            [DetectedClientDeviceEnum.Android]: 'ANDROID'
        };

        return devicePlatformMap[platform] ? this.platform[devicePlatformMap[platform]] : false;
    }

    detected(): DetectedClientDeviceEnum {
        switch (true) {
            case this.platform.BLINK:
                return DetectedClientDeviceEnum.Chrome;
            case this.platform.EDGE:
                return DetectedClientDeviceEnum.EDGE;
            case this.platform.FIREFOX:
                return DetectedClientDeviceEnum.Firefox;
            case this.platform.SAFARI:
                return DetectedClientDeviceEnum.Safari;
            case this.platform.TRIDENT:
                return DetectedClientDeviceEnum.IE;
            case this.platform.WEBKIT:
                return DetectedClientDeviceEnum.WebKit;
            case this.platform.ANDROID:
                return DetectedClientDeviceEnum.Android;
            case this.platform.IOS:
                return DetectedClientDeviceEnum.IOS;
            case this.platform.isBrowser:
                return DetectedClientDeviceEnum.IsBrowser;
            default:
                return undefined;
        }
    }
}
