import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiChipModule, UiImageModule } from '@scaleo/ui-kit/elements';

import { AdvertiserChipComponent } from './advertiser-chip.component';

@NgModule({
    declarations: [AdvertiserChipComponent],
    imports: [CommonModule, UiChipModule, UiImageModule],
    exports: [AdvertiserChipComponent]
})
export class AdvertiserChipModule {}
