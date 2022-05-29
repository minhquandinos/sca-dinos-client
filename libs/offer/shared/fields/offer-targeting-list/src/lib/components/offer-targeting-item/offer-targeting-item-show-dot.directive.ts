import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { OfferTargetingGeoElementModel } from '../../../../../../../common/src/lib/offer';

@Directive({
    selector: '[appOfferTargetingItemShowDot]'
})
export class OfferTargetingItemShowDotDirective {
    @Input('appOfferTargetingItemShowDot') set appUnless({
        allowed,
        denied,
        showIfMore
    }: {
        allowed: OfferTargetingGeoElementModel[];
        denied: OfferTargetingGeoElementModel[];
        showIfMore: number;
    }) {
        if (!this.hasView) {
            if (allowed?.length > showIfMore || denied?.length > showIfMore) {
                this.show();
            }

            if (allowed?.length && denied?.length && !this.hasView) {
                this.show();
            }
        } else {
            this.clear();
        }
    }

    private hasView = false;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

    private show(): void {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
    }

    private clear(): void {
        this.viewContainer.clear();
        this.hasView = false;
    }
}
