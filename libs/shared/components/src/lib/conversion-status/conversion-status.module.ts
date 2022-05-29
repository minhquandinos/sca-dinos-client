import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { FirstCharacterPipeModule } from '@scaleo/shared/pipes';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { ConversionStatusComponent } from './conversion-status.component';

@NgModule({
    declarations: [ConversionStatusComponent],
    exports: [ConversionStatusComponent],
    imports: [CommonModule, UiChipModule, SharedModule, FirstCharacterPipeModule, PlatformStatusesModule]
})
export class ConversionStatusModule {}
