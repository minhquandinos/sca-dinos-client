import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DeliverLeadsEnum } from '@scaleo/feature/manager/leads/deliver/common';
import { UiTabModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-leads-receive-navigation',
    template: `
        <ui-tab-nav-bar class="h-100">
            <a ui-tab-nav-link *ngFor="let nav of navigation" [routerLink]="[nav.route]" routerLinkActive="active">
                {{ nav.title | translate }}
            </a>
        </ui-tab-nav-bar>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerLeadsDeliverNavigationComponent {
    readonly navigation: UiTabModel[] = [
        {
            route: DeliverLeadsEnum.Deliveries,
            title: 'leads_ui_page.deliver.deliveries.title'
        }
    ];
}
