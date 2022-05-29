import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { AdvertiserOfferListNavigationComponent } from './advertiser-offer-list-navigation/advertiser-offer-list-navigation.component';

@NgModule({
    declarations: [AdvertiserOfferListNavigationComponent],
    imports: [CommonModule, UiTabNavBarModule, RouterModule, PlatformFormatPipeModule, SharedModule]
})
export class AdvertiserOfferListNavigationComponentModule {}
