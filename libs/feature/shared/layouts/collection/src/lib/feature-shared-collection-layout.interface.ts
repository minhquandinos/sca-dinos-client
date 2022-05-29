import { TemplateRef } from '@angular/core';

export interface FeatureSharedCollectionLayoutInterface {
    setFilterPortal(portalTemplate: TemplateRef<any>): void;

    setControlPortal(portalTemplate: TemplateRef<any>): void;

    setFooterPortal(portalTemplate: TemplateRef<any>): void;

    setHintPortal(portalTemplate: TemplateRef<any>): void;
}
