import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ReceiveLeadsEnum } from '@scaleo/feature-manager-leads-receive-campaigns-list-data-access';
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
export class ManagerLeadsReceiveNavigationComponent {
    readonly navigation: UiTabModel[] = [
        {
            route: ReceiveLeadsEnum.Campaigns,
            title: 'leads_ui_page.receive.campaigns.title'
        }
    ];
}
