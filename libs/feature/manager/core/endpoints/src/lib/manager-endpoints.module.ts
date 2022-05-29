import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EndpointsModule } from '@scaleo/platform/endpoints';

import { MANAGER_API_ENDPOINTS } from './manager-endpoints';

@NgModule({
    imports: [CommonModule, EndpointsModule.forChild({ endpoints: MANAGER_API_ENDPOINTS })]
})
export class ManagerEndpointsModule {}
