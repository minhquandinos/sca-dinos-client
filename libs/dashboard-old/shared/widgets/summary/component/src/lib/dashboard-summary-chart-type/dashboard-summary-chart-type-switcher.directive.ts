import { Directive, ElementRef, OnInit, ViewContainerRef } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

@Directive({
    selector: '[appDashboardSummaryChartTypeSwitcher]'
})
export class DashboardSummaryChartTypeSwitcherDirective implements OnInit {
    constructor(private host: ElementRef, private container: ViewContainerRef, private profile: ProfileQuery) {}

    ngOnInit(): void {
        if (this.profile.role === DefaultRoleEnum.AffiliateManager && !this.profile.showNetworkRevenue) {
            const el: HTMLElement = this.host.nativeElement;
            el.parentElement.removeChild(el);
        }
    }
}
