import { Component } from '@angular/core';

import { WindowRefService } from '@scaleo/core/window-ref/service';

@Component({
    selector: 'platform-demo-alert-link-to-trial',
    templateUrl: './demo-alert-link-to-trial.component.html'
})
export class DemoAlertLinkToTrialComponent {
    private readonly trialLink = 'https://www.scaleo.io/en?trial=1';

    public showCalendly = false;

    constructor(private window: WindowRefService) {}

    public startTrial() {
        this.window.nativeWindow.open(this.trialLink, '_blank');
    }

    public bookDemo() {
        this.showCalendly = !this.showCalendly;
    }

    public close() {
        this.showCalendly = false;
    }
}
