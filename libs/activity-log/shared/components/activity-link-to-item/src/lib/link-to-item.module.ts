import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { LinkToItemComponent } from './link-to-item.component';

@NgModule({
    declarations: [LinkToItemComponent],
    exports: [LinkToItemComponent],
    imports: [CommonModule, PlatformFormatPipeModule]
})
export class LinkToItemModule {}
