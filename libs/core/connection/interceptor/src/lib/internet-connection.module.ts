import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ConnectionInterceptor } from './connection.interceptor';

@NgModule({
    imports: [CommonModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: ConnectionInterceptor, multi: true }]
})
export class InternetConnectionModule {}
