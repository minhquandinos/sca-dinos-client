import { Component } from '@angular/core';

import { SettingsCardService } from '@scaleo/feature/manager/settings/shared';

@Component({
    selector: 'scaleo-mng-settings-affiliates',
    templateUrl: './affiliates.component.html'
})
export class AffiliatesComponent {
    constructor(private readonly settingsCardService: SettingsCardService) {}

    save(): void {
        this.settingsCardService.saveSubject.next(true);
    }
}
