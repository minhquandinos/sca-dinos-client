import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ForbiddenInterceptor } from './forbidden.interceptor';

@NgModule({
    imports: [CommonModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: ForbiddenInterceptor, multi: true }]
})
export class AuthForbiddenModule {}
