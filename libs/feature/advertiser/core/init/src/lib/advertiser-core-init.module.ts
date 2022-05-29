import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdvertiserEndpointsModule } from '@scaleo/feature/advertiser/core/endpoints';
import { AdvertiserTranslateModule } from '@scaleo/feature/advertiser/core/translate';

@NgModule({
    imports: [CommonModule, AdvertiserEndpointsModule, AdvertiserTranslateModule],
    providers: []
})
export class AdvertiserCoreInitModule {}
