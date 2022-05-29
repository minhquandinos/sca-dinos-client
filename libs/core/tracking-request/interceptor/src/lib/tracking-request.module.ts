import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TrackingRequestInterceptor } from './tracking-request.interceptor';

@NgModule({
    imports: [CommonModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TrackingRequestInterceptor, multi: true }]
})
export class TrackingRequestModule {}
