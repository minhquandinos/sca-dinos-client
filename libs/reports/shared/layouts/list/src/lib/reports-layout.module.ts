import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ReportsLayoutComponent } from './reports-layout.component';

@NgModule({
    declarations: [ReportsLayoutComponent],
    imports: [CommonModule, UiPageWrapperModule, RouterModule, SharedModule] // , UiTabNavBarModule, CustomInfoTooltipModule
})
export class ReportsLayoutModule {}
