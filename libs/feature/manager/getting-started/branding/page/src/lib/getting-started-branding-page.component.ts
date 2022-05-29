import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';

import { GettingStartedService } from '@scaleo/feature/manager/getting-started/data-access';
import { BrandingFormComponent } from '@scaleo/feature/manager/settings/branding/form';

@Component({
    selector: 'scaleo-manager-getting-started-branding',
    templateUrl: './getting-started-branding-page.component.html'
})
export class GettingStartedBrandingPageComponent {
    constructor(private readonly gettingStartedService: GettingStartedService, private readonly route: ActivatedRoute) {}

    @ViewChild(BrandingFormComponent)
    private readonly brandingFormRef: BrandingFormComponent;

    save(): void {
        this.brandingFormRef.save();
    }

    skip(): void {
        this.gettingStartedService.skip(this.route);
    }

    afterSaved(): void {
        this.gettingStartedService
            .completeGettingStarted(2)
            .pipe(
                switchMap(() => this.gettingStartedService.getCompleteStages()),
                tap(() => {
                    this.gettingStartedService.skip(this.route);
                }),
                take(1)
            )
            .subscribe();
    }
}
