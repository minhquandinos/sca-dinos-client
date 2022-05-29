import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthLayoutModule } from '../auth-layout/auth-layout.module';
import { EmptyLayoutModule } from '../empty-layout/empty-layout.module';
import { PanelLayoutModule } from '../panel-layout/panel-layout.module';
import { ScaleoLayoutComponent } from './scaleo-layout.component';

const modules = [EmptyLayoutModule, AuthLayoutModule, PanelLayoutModule];

@NgModule({
    declarations: [ScaleoLayoutComponent],
    imports: [CommonModule, ...modules],
    exports: [...modules]
})
export class ScaleoLayoutModule {}
