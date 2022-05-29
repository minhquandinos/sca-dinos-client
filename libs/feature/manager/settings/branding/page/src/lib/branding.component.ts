import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { BrandingFormComponent } from '@scaleo/feature/manager/settings/branding/form';

@Component({
    selector: 'manager-settings-branding',
    templateUrl: './branding.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class BrandingComponent {
    @ViewChild(BrandingFormComponent)
    private readonly brandingFormRef: BrandingFormComponent;

    public save(): void {
        this.brandingFormRef.save();
    }
}
