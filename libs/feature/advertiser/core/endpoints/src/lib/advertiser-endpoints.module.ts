import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EndpointsModule } from '@scaleo/platform/endpoints';

import { ADVERTISER_API_ENDPOINTS } from './advertiser-api-endpoints';

@NgModule({
    imports: [CommonModule, EndpointsModule.forChild({ endpoints: ADVERTISER_API_ENDPOINTS })]
})
export class AdvertiserEndpointsModule {}
