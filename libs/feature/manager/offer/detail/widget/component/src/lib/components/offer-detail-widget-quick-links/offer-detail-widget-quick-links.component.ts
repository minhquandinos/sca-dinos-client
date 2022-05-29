import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { BaseObjectModel, FunctionType } from '@scaleo/core/data';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { NavigateRootService, QuickLinksIconEnum } from '@scaleo/shared/components';

@Component({
    selector: 'app-offer-detail-widget-quick-links',
    templateUrl: './offer-detail-widget-quick-links.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferDetailWidgetQuickLinksComponent {
    @Input() offerId: number;

    @Input() previewLink: string;

    readonly quickLinksIconEnum = QuickLinksIconEnum;

    constructor(
        private readonly navigateRootService: NavigateRootService,
        private readonly window: WindowRefService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    linkToReports(): FunctionType {
        return () => {
            this.navigateRootService.navigate('/reports/statistics/day', this.getParamsForNavigate);
        };
    }

    linkToClicks(): FunctionType {
        return () => {
            this.navigateRootService.navigate('/transactions/clicks', this.getParamsForNavigate);
        };
    }

    linkToConversions(): FunctionType {
        return () => {
            this.navigateRootService.navigate('/transactions/conversions', this.getParamsForNavigate);
        };
    }

    preview(): FunctionType {
        return () => {
            this.window.nativeWindow.open(this.previewLink, '_blank');
        };
    }

    private get getParamsForNavigate(): BaseObjectModel {
        return {
            [ReportFilterFilterEnum.Offer]: this.offerId
        };
    }
}
