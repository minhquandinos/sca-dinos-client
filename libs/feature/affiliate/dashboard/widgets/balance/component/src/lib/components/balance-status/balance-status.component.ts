import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BalanceWidgetModel } from '@scaleo/feature-affiliate-dashboard-widgets-balance-data-access';

@Component({
    selector: 'app-balance-status',
    templateUrl: './balance-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceStatusComponent {
    @Input() data: BalanceWidgetModel;
}
