import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerCoreInitModule } from '@scaleo/feature/manager/core/init';
import { ThemeConfigModule } from '@scaleo/platform/theme/service';

import { ManagerPagesComponent } from './manager-pages.component';
import { FeatureManagerPagesModule } from './manager-pages-routing.module';

@NgModule({
    declarations: [ManagerPagesComponent],
    imports: [CommonModule, ManagerCoreInitModule, FeatureManagerPagesModule, ThemeConfigModule.forChild()]
})
export class ManagerPagesModule {}
