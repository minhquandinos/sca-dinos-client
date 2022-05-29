import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
    declarations: [TruncateTextPipe],
    imports: [CommonModule],
    exports: [TruncateTextPipe]
})
export class TruncateTextPipeModule {}
