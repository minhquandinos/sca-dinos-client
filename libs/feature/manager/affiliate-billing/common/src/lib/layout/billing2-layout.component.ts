import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';

import { affiliateBillingNavigationConfig, AffiliateBillingNavigationModel } from './configs/affiliate-billing-navigation.config';
import { AffiliateBillingNavigationEnum } from './enums/affiliate-billing-navigation.enum';

@Component({
    selector: 'app-billing-layout',
    templateUrl: './billing2-layout.component.html'
})
export class Billing2LayoutComponent implements OnInit {
    billingNavigation: AffiliateBillingNavigationModel[];

    @ViewChild('headerContainer', { read: ViewContainerRef, static: true })
    readonly headerContainer: ViewContainerRef;

    @ViewChild('filterContainer', { static: true })
    readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild('footerContainer', { static: true })
    readonly footerContainer: TemplateRef<HTMLElement>;

    @ViewChild('affiliatesTooltipTpl', { static: true })
    private readonly affiliatesTooltipTpl: TemplateRef<HTMLElement>;

    @ViewChild('invoicesTooltipTpl', { static: true })
    private readonly invoicesTooltipTpl: TemplateRef<HTMLElement>;

    @ViewChild('actionContainer', { read: ViewContainerRef, static: true })
    readonly actionContainer: ViewContainerRef;

    ngOnInit(): void {
        this.billingNavigation = this.getBillingNavigation;
    }

    private get getBillingNavigation(): AffiliateBillingNavigationModel[] {
        const navTooltips: BaseObjectModel = {
            [AffiliateBillingNavigationEnum.Affiliates]: this.affiliatesTooltipTpl,
            [AffiliateBillingNavigationEnum.Invoices]: this.invoicesTooltipTpl
        };

        return affiliateBillingNavigationConfig.map((navigation) => ({
            ...navigation,
            tooltip: navTooltips?.[navigation?.route] || undefined
        }));
    }

    createAction(template: TemplateRef<any>) {
        this.actionContainer.clear();
        if (template) {
            this.actionContainer.createEmbeddedView(template);
        }
    }

    createHeader(template: TemplateRef<any>) {
        this.headerContainer.clear();
        if (template) {
            this.headerContainer.createEmbeddedView(template);
        }
    }

    trackByFn(index: number, item: AffiliateBillingNavigationModel): number | string {
        return item?.id || index;
    }
}
