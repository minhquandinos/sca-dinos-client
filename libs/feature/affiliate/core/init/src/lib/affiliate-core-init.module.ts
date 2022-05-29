import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AffiliateEndpointsModule } from '@scaleo/feature/affiliate/core/endpoints';
import { AffiliateTranslateModule } from '@scaleo/feature/affiliate/core/translate';

@NgModule({
    imports: [CommonModule, AffiliateEndpointsModule, AffiliateTranslateModule]
})
export class AffiliateCoreInitModule {}
