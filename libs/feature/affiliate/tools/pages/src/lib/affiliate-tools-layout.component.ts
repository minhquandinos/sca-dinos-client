import { Component, Inject } from '@angular/core';

import { AFFILIATE_TOOLS_NAVIGATION_TOKEN } from '@scaleo/feature/affiliate/tools/pages';
import { BaseNavModel } from '@scaleo/shared/data';

@Component({
    selector: 'app-tools-layout',
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
    `
})
export class AffiliateToolsLayoutComponent {
    constructor(@Inject(AFFILIATE_TOOLS_NAVIGATION_TOKEN) public readonly navigation: BaseNavModel[]) {}
}
