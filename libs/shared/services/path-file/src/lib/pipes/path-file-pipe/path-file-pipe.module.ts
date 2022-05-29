import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PathFilePipe } from './path-file.pipe';

@NgModule({
    declarations: [PathFilePipe],
    imports: [CommonModule],
    exports: [PathFilePipe]
})
export class PathFilePipeModule {}
