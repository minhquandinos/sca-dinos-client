import { Component } from '@angular/core';

import { BaseNavModel } from '@scaleo/shared/data';

@Component({
    selector: 'scaleo-advertiser-access-tools-layout',
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
export class AdvertiserToolsLayoutComponent {
    readonly navigation: BaseNavModel[] = [
        {
            title: 'mobile_app.menu',
            routeLink: 'mobile-app'
        }
    ];
}
