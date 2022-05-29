import { Component } from '@angular/core';

import { SettingsCardService } from '@scaleo/feature/manager/settings/shared';

@Component({
    selector: 'scaleo-mng-settings-advertisers',
    templateUrl: './advertisers.component.html'
})
export class AdvertisersComponent {
    constructor(private readonly settingsCardService: SettingsCardService) {}

    save(): void {
        this.settingsCardService.saveSubject.next(true);
    }
}
