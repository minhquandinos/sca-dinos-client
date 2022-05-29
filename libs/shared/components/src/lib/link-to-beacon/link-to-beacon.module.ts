import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { LinkToBeaconComponent } from './link-to-beacon.component';

@NgModule({
    declarations: [LinkToBeaconComponent],
    exports: [LinkToBeaconComponent],
    imports: [CommonModule, SharedModule]
})
export class LinkToBeaconModule {}
