import { ChangeDetectionStrategy, Component, HostBinding, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'scaleo-reports-layout',
    templateUrl: './reports-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsLayoutComponent {
    @ViewChild('headerContainer', { read: ViewContainerRef, static: true })
    headerContainer: ViewContainerRef;

    @HostBinding('class') hostClass = 'reports-layout';

    @ViewChild('invalidClickTooltipTpl', { static: true }) invalidClickTooltipTpl: TemplateRef<any>;

    @ViewChild('advertisersPostbackTooltipTpl', { static: true }) advertisersPostbackTooltipTpl: TemplateRef<any>;

    @ViewChild('affiliatesPostbackTooltipTpl', { static: true }) affiliatesPostbackTooltipTpl: TemplateRef<any>;

    @ViewChild('adjustmentsPostbackTooltipTpl', { static: true }) adjustmentsPostbackTooltipTpl: TemplateRef<any>;

    @ViewChild('referralsTooltipTpl', { static: true }) referralsTooltipTpl: TemplateRef<any>;

    createHeader(template: TemplateRef<any>): void {
        this.headerContainer.clear();
        this.headerContainer.createEmbeddedView(template);
    }
}
