import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AdblockInfoBarModule } from '@scaleo/core/adblock/info-bar';
import { SharedModule } from '@scaleo/core/shared/module';
import { DemoAlertLinkToTrialModule } from '@scaleo/demo-link-to-trial';
import { PlatformIsDemoModule } from '@scaleo/demo-service';
import { ClientCodeHelpScoutService, ClientCodeIntercomService } from '@scaleo/platform/client-code';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { DefaultRoleUtil } from '@scaleo/platform/role/util';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { RefreshVersionModule } from '@scaleo/shared/components2/refresh-version';
import { ViewBelongAccountModule } from '@scaleo/shared/components2/view-belong-account';
import { PageTitleService } from '@scaleo/shared/services/page-title';

import { AccountPagesRoutingModule } from './account-pages-routing.module';
import { AccountShellComponent } from './account-shell/account-shell.component';

@NgModule({
    imports: [
        CommonModule,
        AccountPagesRoutingModule,
        PlatformIsDemoModule,
        SharedModule,
        DemoAlertLinkToTrialModule,
        ViewBelongAccountModule,
        AdblockInfoBarModule,
        RefreshVersionModule
    ],
    declarations: [AccountShellComponent]
})
export class AccountPagesModule {
    constructor(
        private readonly profile: ProfileQuery,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly pageTitleService: PageTitleService,
        private readonly clientCodeHelpScoutService: ClientCodeHelpScoutService,
        private readonly clientCodeIntercomService: ClientCodeIntercomService,
        private readonly settings: PlatformSettingsQuery
    ) {
        this.setHeaderTitle();
        this.roleWatcher();
    }

    private setHeaderTitle(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let child = this.route.firstChild;
                    let parentHeader = '';
                    while (child.firstChild) {
                        child = child.firstChild;

                        const { header = undefined } = child.snapshot.data || {};
                        if (header) {
                            parentHeader = header;
                        }
                    }

                    const { currentHeader = undefined } = child.snapshot.data || {};
                    if (currentHeader || parentHeader) {
                        return currentHeader || parentHeader;
                    }
                    return undefined;
                }),
                tap((title) => {
                    if (title) {
                        this.pageTitleService.setTitle(title);
                    }
                })
            )
            .subscribe();
    }

    private roleWatcher(): void {
        this.profile.roleIsNotEmpty$
            .pipe(
                distinctUntilChanged(),
                tap((role) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const { intercom_users_code, intercom_client_id } = this.settings.settings;

                    if (DefaultRoleUtil.isDefaultManagers(role)) {
                        this.clientCodeHelpScoutService.insert();

                        if (intercom_users_code) {
                            this.clientCodeIntercomService.insert();
                        }
                    }

                    if ([DefaultRoleEnum.AffiliateManager, DefaultRoleEnum.AdvertiserManager].includes(role) && intercom_client_id) {
                        this.clientCodeIntercomService.insert(intercom_client_id);
                    }
                })
            )
            .subscribe();
    }
}
