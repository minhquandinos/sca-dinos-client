import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomSwitchModule, FormLogoModule, InputModule, TextareaModule, UpgradePlanInfoModule } from '@scaleo/shared/components';
import { FindOfferModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { DomainsForTrackingLinkComponent } from './components/domains-for-tracking-link/domains-for-tracking-link.component';
import { OtherOffersComponent } from './components/other-offers/other-offers.component';
import { OtherOffersService } from './components/other-offers/other-offers.service';
import { OtherOffersItemComponent } from './components/other-offers/other-offers-item.component';
import { SmartLinkCreateComponent } from './smart-link-create.component';

@NgModule({
    declarations: [SmartLinkCreateComponent, OtherOffersComponent, DomainsForTrackingLinkComponent, OtherOffersItemComponent],
    imports: [
        CommonModule,
        TextareaModule,
        InputModule,
        SharedModule,
        FormLogoModule,
        SelectModule,
        CustomSwitchModule,
        FindPlatformListModule,
        FindPlatformStatusesModule,
        FindOfferModule,
        UiSvgIconModule,
        UiSkeletonModule,
        IsTruthyModule,
        UiButtonLinkModule,
        Modal3EditFormModule,
        UpgradePlanInfoModule,
        DisableButtonDuringRequestDirectiveModule
    ],
    exports: [SmartLinkCreateComponent],
    providers: [OtherOffersService]
})
export class ManagerOfferSmartLinkUpsertModalFormModule {}
