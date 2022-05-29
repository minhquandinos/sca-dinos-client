import { NgModule } from '@angular/core';

import { FormatPipe } from './format.pipe';
import { FormatByKeyPipe } from './format-by-key.pipe';
import { FormatOrEmptyPipe } from './format-or-empty.pipe';

@NgModule({
    declarations: [FormatPipe, FormatByKeyPipe, FormatOrEmptyPipe],
    exports: [FormatPipe, FormatByKeyPipe, FormatOrEmptyPipe],
    providers: [FormatPipe]
})
export class PlatformFormatPipeModule {}
