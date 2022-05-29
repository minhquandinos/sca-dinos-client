import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MANAGER_SETTINGS_NAVIGATION } from './manager-settings-navigation';

@Component({
    selector: 'manager-settings-layout',
    template: `
        <div fxLayout="row" fxLayout.md="column" fxFlexFill>
            <div fxFlex="200px" fxFlex.md="100" fxLayoutGap.md="1rem" class="mr-md-4">
                <div appSticky="bottomTop">
                    <app-sidenav class="sidenav" [navigations]="navigation"></app-sidenav>
                </div>
            </div>

            <div fxFlex fxLayout="column">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styleUrls: ['./manager-settings-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ManagerSettingsLayoutComponent {
    readonly navigation = MANAGER_SETTINGS_NAVIGATION;
}
