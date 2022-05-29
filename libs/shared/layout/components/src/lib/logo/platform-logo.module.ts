import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigateRootModule } from '@scaleo/shared/components';

import { PlatformLogoComponent } from './platform-logo.component';

@NgModule({
    declarations: [PlatformLogoComponent],
    imports: [CommonModule, RouterModule, NavigateRootModule],
    exports: [PlatformLogoComponent]
})
export class PlatformLogoModule {}
