import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { DashboardConfigService } from '@scaleo/dashboard/service';

@Component({
    selector: 'app-dashboard-toolbar',
    templateUrl: './dashboard-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardToolbarComponent {
    @HostBinding('class') hostClass = 'd-block';

    constructor(public dashboardConfigService: DashboardConfigService) {}
}
