import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EndpointsModule } from '@scaleo/platform/endpoints';

import { AUTH_API_ENDPOINTS, AuthEndpointsModel } from './auth-endpoints';

@NgModule({
    imports: [CommonModule, EndpointsModule.forChild<AuthEndpointsModel>({ endpoints: AUTH_API_ENDPOINTS })]
})
export class AuthEndpointsModule {}
