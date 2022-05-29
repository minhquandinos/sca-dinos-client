import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AffiliateCoreInitModule } from '@scaleo/feature/affiliate/core/init';
import { ThemeConfigModule } from '@scaleo/platform/theme/service';

import { AffiliatePagesComponent } from './affiliate-pages.component';
import { AffiliatePagesRoutingModule } from './affiliate-pages-routing.module';

@NgModule({
    declarations: [AffiliatePagesComponent],
    imports: [CommonModule, AffiliateCoreInitModule, AffiliatePagesRoutingModule, ThemeConfigModule.forChild()]
})
export class AffiliatePagesModule {}
