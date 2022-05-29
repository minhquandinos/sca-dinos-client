import { Portal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewContainerRef } from '@angular/core';

import { FeatureSharedCollectionLayoutInterface } from './feature-shared-collection-layout.interface';
import { FEATURE_SHARED_COLLECTION_LAYOUT_TOKEN } from './feature-shared-collection-layout.token';

@Component({
    selector: 'scaleo-feature-shared-collection-layout',
    templateUrl: './feature-shared-collection-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FEATURE_SHARED_COLLECTION_LAYOUT_TOKEN,
            useExisting: FeatureSharedCollectionLayoutComponent
        }
    ]
})
export class FeatureSharedCollectionLayoutComponent implements FeatureSharedCollectionLayoutInterface {
    filterPortal: Portal<any>;

    controlPortal: Portal<any>;

    footerPortal: Portal<any>;

    hintPortal: Portal<any>;

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

    setHintPortal(portalTemplate: TemplateRef<any>): void {
        this.hintPortal = new TemplatePortal(portalTemplate, this._viewContainerRef);
    }
}
