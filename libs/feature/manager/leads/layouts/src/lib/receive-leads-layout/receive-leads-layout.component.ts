import { Portal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewContainerRef } from '@angular/core';

// import { ReceiveLeadsEnum } from '@scaleo/feature-manager-leads-receive-campaigns-list-data-access';
// import { UiTabModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-receive-leads-layout',
    templateUrl: './receive-leads-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiveLeadsLayoutComponent {
    filterPortal: Portal<any>;

    controlPortal: Portal<any>;

    footerPortal: Portal<any>;

    constructor(private _viewContainerRef: ViewContainerRef) {}

    setFilterPortal(portalTemplate: TemplateRef<any>): void {
        this.filterPortal = new TemplatePortal(portalTemplate, this._viewContainerRef);
    }

    setControlPortal(portalTemplate: TemplateRef<any>): void {
        this.controlPortal = new TemplatePortal(portalTemplate, this._viewContainerRef);
    }

    setFooterPortal(portalTemplate: TemplateRef<any>): void {
        this.footerPortal = new TemplatePortal(portalTemplate, this._viewContainerRef);
    }
}
