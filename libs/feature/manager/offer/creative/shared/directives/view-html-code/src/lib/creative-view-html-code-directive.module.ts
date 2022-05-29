import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreativeViewHtmlCodeDirective } from './creative-view-html-code.directive';

@NgModule({
    declarations: [CreativeViewHtmlCodeDirective],
    imports: [CommonModule],
    exports: [CreativeViewHtmlCodeDirective]
})
export class CreativeViewHtmlCodeDirectiveModule {}
