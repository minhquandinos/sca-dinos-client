import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PregMatchPipe } from './preg-match.pipe';

@NgModule({
    declarations: [PregMatchPipe],
    imports: [CommonModule],
    exports: [PregMatchPipe]
})
export class PregMatchPipeModule {}
