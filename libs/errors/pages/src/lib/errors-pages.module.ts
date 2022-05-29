import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeConfigModule } from '@scaleo/platform/theme/service';

import { ErrorsPagesComponent } from './errors-pages.component';
import { ErrorsPagesRoutingModule } from './errors-pages-routing.module';

@NgModule({
    declarations: [ErrorsPagesComponent],
    imports: [CommonModule, ThemeConfigModule.forChild(), ErrorsPagesRoutingModule]
})
export class ErrorsPagesModule {}
