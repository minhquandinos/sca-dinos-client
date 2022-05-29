import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defer, Observable, switchMap } from 'rxjs';

import { MenuModel, ProfileQuery } from '@scaleo/account/data-access';
import { PlatformUiQuery } from '@scaleo/platform/state/ui';
import { PanelLayoutService } from '@scaleo/ui-kit/layout';

@Component({
    selector: 'shared-layout-desktop-menu',
    templateUrl: './desktop-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopMenuComponent {
    readonly menus$: Observable<MenuModel[]> = this.platformUiQuery.select('uiInterface').pipe(
        switchMap((uiInterface) => {
            return defer(() => (uiInterface === 'default' ? this.profileQuery.menus$ : this.profileQuery.menuLeads$));
        })
    );

    readonly collapseMenu$ = this.panelLayoutService.collapseMenu$;

    constructor(
        private profileQuery: ProfileQuery,
        private readonly platformUiQuery: PlatformUiQuery,
        private readonly panelLayoutService: PanelLayoutService
    ) {}
}
