import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { PoweredByModule } from '../../../../../../../apps/scaleo/src/app/auth/shared/components/auth-powered-by/auth-powered-by.module';
// import { PageHeaderModule } from '../../../../../../../apps/scaleo/src/app/modules/page-header/page-header.module';
// import { PlatformLogoModule } from '../../../../../../../apps/scaleo/src/app/shared/components/platform-logo/platform-logo.module';
// import { SharedModule } from '../../../../../../../apps/scaleo/src/app/shared/shared.module';
import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
    declarations: [AuthLayoutComponent],
    imports: [CommonModule, RouterModule],
    exports: [AuthLayoutComponent]
})
export class AuthLayoutModule {}
