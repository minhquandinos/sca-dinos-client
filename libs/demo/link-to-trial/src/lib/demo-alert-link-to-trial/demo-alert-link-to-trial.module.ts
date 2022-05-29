import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformIsDemoModule, PlatformIsDemoService } from '@scaleo/demo-service';
import { PlatformCalendlyModule } from '@scaleo/platform/calendly/component';
import { SnackBarService, UiAlertModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { DemoAlertLinkToTrialComponent } from './demo-alert-link-to-trial.component';

@NgModule({
    declarations: [DemoAlertLinkToTrialComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule, PlatformCalendlyModule, UiAlertModule, PlatformIsDemoModule],
    exports: [DemoAlertLinkToTrialComponent]
})
export class DemoAlertLinkToTrialModule {
    constructor(private platformIsDemoService: PlatformIsDemoService, private snackBarService: SnackBarService) {
        this.isDemoShow();
    }

    private isDemoShow(): void {
        if (this.platformIsDemoService.isDemoUrl) {
            this.snackBarService.open({
                component: {
                    entity: DemoAlertLinkToTrialComponent
                }
            });
        }
    }
}
