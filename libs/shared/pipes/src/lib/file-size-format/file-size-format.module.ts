import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileSizeFormatPipe } from './file-size-format.pipe';

@NgModule({
    declarations: [FileSizeFormatPipe],
    imports: [CommonModule],
    exports: [FileSizeFormatPipe]
})
export class FileSizeFormatModule {}
