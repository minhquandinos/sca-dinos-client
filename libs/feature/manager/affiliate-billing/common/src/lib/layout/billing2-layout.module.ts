import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomInfoTooltipModule } from '@scaleo/shared/components';
import { UiPageWrapperModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { Billing2LayoutComponent } from './billing2-layout.component';

@NgModule({
    declarations: [Billing2LayoutComponent],
    imports: [CommonModule, SharedModule, RouterModule, UiPageWrapperModule, UiTabNavBarModule, CustomInfoTooltipModule]
})
export class Billing2LayoutModule {}
