import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthCoreInitModule } from '@scaleo/feature/auth/core/init';
import { ThemeConfigModule } from '@scaleo/platform/theme/service';

import { AuthPagesComponent } from './auth-pages.component';
import { AuthPagesRoutingModule } from './auth-pages-routing.module';

@NgModule({
    declarations: [AuthPagesComponent],
    imports: [CommonModule, AuthCoreInitModule, ThemeConfigModule.forChild(), AuthPagesRoutingModule]
})
export class AuthPagesModule {}
