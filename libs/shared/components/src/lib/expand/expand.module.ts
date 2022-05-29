import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExpandComponent } from './expand.component';
import { ExpandTruncateTextPipe } from './pipes/expand-truncate-text.pipe';

@NgModule({
    declarations: [ExpandComponent, ExpandTruncateTextPipe],
    exports: [ExpandComponent, ExpandTruncateTextPipe],
    imports: [CommonModule]
})
export class ExpandModule {}
