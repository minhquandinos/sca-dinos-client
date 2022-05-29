import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSvgIconModule } from '@scaleo/ui-kit/elements';
import { UiTooltipModule } from '@scaleo/ui-kit/elements/tooltip';

import { LinkToBeaconModule } from '../link-to-beacon/link-to-beacon.module';
import { CustomInfoTooltipComponent } from './custom-info-tooltip.component';
import { CustomInfoTooltipTemplateComponent } from './custom-info-tooltip-template.component';

@NgModule({
    declarations: [CustomInfoTooltipComponent, CustomInfoTooltipTemplateComponent],
    imports: [CommonModule, UiSvgIconModule, UiTooltipModule, LinkToBeaconModule],
    exports: [CustomInfoTooltipComponent, CustomInfoTooltipTemplateComponent]
})
export class CustomInfoTooltipModule {}
