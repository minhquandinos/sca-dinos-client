import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { AuthAsService } from '@scaleo/auth/as/service';
import { BaseObjectModel, FunctionType } from '@scaleo/core/data';
import { AFFILIATE_DETAIL_PAGE_TYPE } from '@scaleo/feature/manager/affiliate/detail/detail-widget/common';
import { BaseStatusIdEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { NavigateRootService, QuickLinksIconEnum } from '@scaleo/shared/components';

@Component({
    selector: 'app-affiliate-detail-quick-links',
    templateUrl: './affiliate-detail-quick-links.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateDetailQuickLinksComponent {
    @Input()
    id: number;

    @Input()
    email: string;

    @Input()
    status: BaseStatusIdEnum;

    @HostBinding('class')
    private readonly _hostClass = 'm-b-30';

    readonly quickLinksIconEnum = QuickLinksIconEnum;

    readonly showLinkToBilling$ = this._getShowLinkToBilling$;

    readonly baseStatusIdEnum = BaseStatusIdEnum;

    constructor(
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly _activatedRoute: ActivatedRoute,
        private _authAsService: AuthAsService,
        private readonly _navigateRoot: NavigateRootService
    ) {}

    linkToReports(): FunctionType {
        return () => {
            this._navigateRoot.navigate('/reports/statistics/day', this._getParamsForNavigate);
        };
    }

    linkToClicks(): FunctionType {
        return () => {
            this._navigateRoot.navigate('/transactions/clicks', this._getParamsForNavigate);
        };
    }

    linkToConversions(): FunctionType {
        return () => {
            this._navigateRoot.navigate('/transactions/conversions', this._getParamsForNavigate);
        };
    }

    loginAs(): FunctionType {
        return () => {
            this._authAsService.login(this.email);
        };
    }

    private get _getShowLinkToBilling$(): Observable<boolean> {
        return this._activatedRoute.data.pipe(
            pluck('affiliateDetailPageType'),
            map((affiliateDetailPageType) => affiliateDetailPageType !== AFFILIATE_DETAIL_PAGE_TYPE.billingDetail)
        );
    }

    private get _getParamsForNavigate(): BaseObjectModel {
        return {
            [ReportFilterFilterEnum.Affiliate]: this.id
        };
    }

    toBilling(): FunctionType {
        return () => {
            const url = `billing/affiliates/${this.id}`;
            this._navigateRoot.navigate(url);
        };
    }

    toAffiliate() {
        return () => {
            const url = `affiliates/${this.id}`;
            this._navigateRoot.navigate(url);
        };
    }
}
