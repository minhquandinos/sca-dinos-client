import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreativeHtmlCodeConvertPipe } from './creative-html-code-convert.pipe';

@NgModule({
    declarations: [CreativeHtmlCodeConvertPipe],
    imports: [CommonModule],
    exports: [CreativeHtmlCodeConvertPipe]
})
export class CreativeHtmlCodeConvertPipeModule {}
