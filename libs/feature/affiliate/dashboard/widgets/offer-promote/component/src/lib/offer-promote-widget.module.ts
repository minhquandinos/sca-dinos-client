import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { UiBadgesModule, UiButtonLinkModule, UiTabModule } from '@scaleo/ui-kit/elements';

import { OfferPromoteListModule } from './components/offer-promote-list/offer-promote-list.module';
import { OfferPromoteWidgetComponent } from './offer-promote-widget.component';
import { OfferPromoteAllCategoriesTranslatePipe } from './pipes/offer-promote-all-categories-translate.pipe';

@NgModule({
    declarations: [OfferPromoteWidgetComponent, OfferPromoteAllCategoriesTranslatePipe],
    imports: [
        CommonModule,
        ContainerWidgetModule,
        SharedModule,
        UiButtonLinkModule,
        OfferPromoteListModule,
        RouterModule,
        UiBadgesModule,
        UiTabModule
    ],
    exports: [OfferPromoteWidgetComponent]
})
export class OfferPromoteWidgetModule {}
