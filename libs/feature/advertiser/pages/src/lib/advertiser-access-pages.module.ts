import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdvertiserCoreInitModule } from '@scaleo/feature/advertiser/core/init';
import { AdvertiserUserProfileModule } from '@scaleo/feature/advertiser/user-profile';
import { ThemeConfigModule } from '@scaleo/platform/theme/service';
import { MenuModule, PageTitleModule, PlatformLogoModule, PoweredByModule } from '@scaleo/shared/layout/components';

import { AdvertiserAccessPagesComponent } from './advertiser-access-pages.component';
import { AdvertiserAccessPagesRoutingModule } from './advertiser-access-pages-routing.module';

@NgModule({
    declarations: [AdvertiserAccessPagesComponent],
    imports: [
        CommonModule,
        AdvertiserAccessPagesRoutingModule,
        MenuModule,
        PlatformLogoModule,
        PoweredByModule,
        PageTitleModule,
        AdvertiserUserProfileModule,
        AdvertiserCoreInitModule,
        ThemeConfigModule.forChild()
    ]
})
export class AdvertiserAccessPagesModule {}
