import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck, skip, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { PreloadService } from '@scaleo/core/preload/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { PlatformUiQuery, PlatformUiService, UI_INTERFACE } from '@scaleo/platform/state/ui';
import { UiDropdownComponent } from '@scaleo/ui-kit/elements';

import { UiInterfaceSwitcherModel } from './ui-interface-switcher.model';

@Component({
    selector: 'scaleo-manager-ui-interface-switcher',
    templateUrl: './ui-interface-switcher.component.html',
    styleUrls: ['./ui-interface-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService],
    encapsulation: ViewEncapsulation.None
})
export class UiInterfaceSwitcherComponent implements OnInit {
    @HostBinding('class') hostClass = 'header-interface-switcher';

    public readonly uiInterfaceSwitchers: UiInterfaceSwitcherModel[] = [
        {
            uiInterface: UI_INTERFACE.default,
            title: 'leads_ui_page.switcher_menu.default.title',
            icon: 'affiliate-tracking',
            link: 'dashboard'
        },
        {
            uiInterface: UI_INTERFACE.leads,
            title: 'leads_ui_page.switcher_menu.leads.title',
            icon: 'lead-management',
            link: 'leads/list'
        }
    ];

    public readonly activeUiInterface$ = this.platformUiQuery.select('uiInterface').pipe(debounceTime(0));

    show$ = zip([
        this.platformSettings.settings$.pipe(pluck('leads_management_module')),
        this.checkPermissionService.check$([
            this.permissions.canAccessLeads,
            this.permissions.canAccessLeadsLog,
            this.permissions.canManageLeadsCampaignsAndDelivery
        ])
    ]).pipe(map(([module, permissions]) => !!module && !!permissions));

    @ViewChild(UiDropdownComponent) uiDropdownComponent: UiDropdownComponent;

    constructor(
        private platformUiService: PlatformUiService,
        private preloadService: PreloadService,
        private router: Router,
        private route: ActivatedRoute,
        private profile: ProfileQuery,
        private platformSettings: PlatformSettingsQuery,
        private readonly platformUiQuery: PlatformUiQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.subscribeToInterfaceSwitching();
    }

    switchInterface(menu: UiInterfaceSwitcherModel): void {
        if (this.platformUiQuery.getValue().uiInterface !== menu.uiInterface) {
            this.platformUiService.switchInterface(menu.uiInterface);
            this.navigateAfterChangeUiInterface(menu.link);
        }
        this.uiDropdownComponent.close();
    }

    private navigateAfterChangeUiInterface(link: string): void {
        this.router.navigate([`/manager/${link}`], { relativeTo: this.route });
    }

    private subscribeToInterfaceSwitching(): void {
        this.platformUiQuery
            .select('uiInterface')
            .pipe(distinctUntilChanged(), skip(1), takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.preloadService.setLoaded(false);
                setTimeout(() => {
                    this.preloadService.setLoaded(true);
                }, 300);
            });
    }
}
