import { Component, HostBinding, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { BooleanEnum } from '@scaleo/core/data';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';

@Component({
    selector: 'scaleo-mng-billing-invoice-automatically',
    templateUrl: './billing-invoice-automatically.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class BillingInvoiceAutomaticallyComponent {
    @Input() controlName: string;

    @HostBinding('class') private readonly hostClass = 'd-flex align-items-end';

    readonly allowGenerateInvoiceAutomatically = this.getAllowGenerateInvoiceAutomatically;

    readonly booleanEnum = BooleanEnum;

    constructor(private planPermissionsService: PlanFeatureService) {}

    private get getAllowGenerateInvoiceAutomatically(): boolean {
        return this.planPermissionsService.hasFeature(PLATFORM_PLAN_FEATURE.generateInvoiceAutomatically);
    }
}
