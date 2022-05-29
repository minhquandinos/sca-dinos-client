import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { DetectedClientDeviceEnum, DetectedClientDeviceService } from '@scaleo/core/detected-clinet-device/service';

@Component({
    selector: 'scaleo-feature-shared-application-store',
    template: `
        <a [href]="link" target="_blank" *ngIf="iconAppStore">
            <img [src]="iconAppStore" [height]="48" [width]="162" alt="" />
        </a>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationStoreComponent implements OnInit {
    @Input() link: string;

    iconAppStore: string;

    constructor(private readonly detectedClientDeviceService: DetectedClientDeviceService) {}

    ngOnInit(): void {
        this.setIconAppStore();
    }

    private setIconAppStore(): void {
        const ICONS_PATH = './assets/img/application-stores';

        const iconAppStoreMap: { [key in DetectedClientDeviceEnum]?: string } = {
            [DetectedClientDeviceEnum.Android]: `${ICONS_PATH}/google-play.svg`,
            [DetectedClientDeviceEnum.IOS]: `${ICONS_PATH}/apple-store.svg`
        };
        this.iconAppStore = iconAppStoreMap[this.getNativeOS];
    }

    private get getNativeOS(): DetectedClientDeviceEnum {
        const mobileOSes = [DetectedClientDeviceEnum.IOS, DetectedClientDeviceEnum.Android];
        return mobileOSes.find((os) => this.detectedClientDeviceService.isDevice(os));
    }
}
