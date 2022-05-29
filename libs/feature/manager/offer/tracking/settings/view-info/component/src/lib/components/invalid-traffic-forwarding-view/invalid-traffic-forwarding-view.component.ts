import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import {
    InvalidTrafficForwardingEnum,
    InvalidTrafficForwardingViewModel
} from '@scaleo/feature/manager/offer/tracking/settings/view-info/data-access';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-invalid-traffic-forwarding-view',
    templateUrl: './invalid-traffic-forwarding-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidTrafficForwardingViewComponent implements OnChanges, OnInit {
    @Input() data: InvalidTrafficForwardingViewModel;

    readonly globalTrafficbackUrl = this.settingsQuery.settings.global_trafficback_url;

    forwardingValueTpl: TemplateRef<HTMLElement>;

    @ViewChild('globalTrafficbackUrlTpl', { static: true })
    private readonly globalTrafficbackUrlTpl: TemplateRef<HTMLElement>;

    @ViewChild('customTrafficbackUrlTpl', { static: true })
    private readonly customTrafficbackUrlTpl: TemplateRef<HTMLElement>;

    @ViewChild('offerTpl', { static: true })
    private readonly offerTpl: TemplateRef<HTMLElement>;

    constructor(private readonly settingsQuery: PlatformSettingsQuery) {}

    ngOnInit(): void {
        this.init();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { data } = changes;
        if (data.currentValue) {
            this.init();
        }
    }

    private init(): void {
        this.forwardingValueTpl = this.getForwardingValueTpl;
    }

    private get getForwardingValueTpl(): TemplateRef<HTMLElement> {
        const { fail_traffic_forwarding } = this.data;
        const tplMap = {
            [InvalidTrafficForwardingEnum.Offer]: this.offerTpl,
            [InvalidTrafficForwardingEnum.GlobalTrafficbackUrl]: this.globalTrafficbackUrlTpl,
            [InvalidTrafficForwardingEnum.CustomTrafficbackUrl]: this.customTrafficbackUrlTpl
        };

        return tplMap[fail_traffic_forwarding] || undefined;
    }
}
