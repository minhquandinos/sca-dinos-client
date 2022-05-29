import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { UpgradePlanInfoComponent } from './upgrade-plan-info.component';
import { UpgradePlanInfoTitlePipe } from './upgrade-plan-info-title.pipe';

@NgModule({
    declarations: [UpgradePlanInfoComponent, UpgradePlanInfoTitlePipe],
    exports: [UpgradePlanInfoComponent],
    imports: [CommonModule, UiSvgIconModule, SharedModule]
})
export class UpgradePlanInfoModule {}
