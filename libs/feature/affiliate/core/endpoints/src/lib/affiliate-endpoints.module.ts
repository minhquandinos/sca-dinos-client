import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EndpointsModule } from '@scaleo/platform/endpoints';

import { AFFILIATE_API_ENDPOINTS } from './affiliate-api-endpoints';

@NgModule({
    imports: [CommonModule, EndpointsModule.forChild({ endpoints: AFFILIATE_API_ENDPOINTS })]
})
export class AffiliateEndpointsModule {}
