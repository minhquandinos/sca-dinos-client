import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsCardService } from '@scaleo/feature/manager/settings/shared';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class BillingComponent {
    public showSaveButton$: Observable<boolean> = this.billingService.showSaveButton$;

    constructor(private billingService: SettingsCardService) {}

    public save() {
        this.billingService.saveSubject.next(true);
    }

    public changeShowSaveButton(value: boolean) {
        this.billingService.changeShowSaveButton(value);
    }
}
