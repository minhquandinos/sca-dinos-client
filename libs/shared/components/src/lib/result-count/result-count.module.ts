import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ResultCountComponent } from './result-count.component';

@NgModule({
    declarations: [ResultCountComponent],
    imports: [CommonModule, PlatformFormatPipeModule],
    exports: [ResultCountComponent]
})
export class ResultCountModule {}
