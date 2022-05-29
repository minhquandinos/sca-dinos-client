import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PlatformLanguageInterceptor } from './platform-language.interceptor';

@NgModule({
    imports: [CommonModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: PlatformLanguageInterceptor, multi: true }]
})
export class PlatformLanguageInterceptorModule {}
