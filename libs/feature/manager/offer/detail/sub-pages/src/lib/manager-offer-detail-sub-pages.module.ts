import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@scaleo/core/shared/module';
import { StickyModule } from '@scaleo/shared/directives';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferConfigLayoutComponent } from './layouts/offer-config-layout/offer-config-layout.component';
import { ManagerOfferDetailSubPagesRoutingModule } from './manager-offer-detail-sub-pages-routing.module';

@NgModule({
    declarations: [OfferConfigLayoutComponent],
    imports: [CommonModule, ManagerOfferDetailSubPagesRoutingModule, SharedModule, UiSvgIconModule, FlexLayoutModule, StickyModule]
})
export class ManagerOfferDetailSubPagesModule {}
