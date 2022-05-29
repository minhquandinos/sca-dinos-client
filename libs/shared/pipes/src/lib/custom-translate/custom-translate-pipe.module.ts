import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomTranslatePipe } from './customTranslate.pipe';

@NgModule({
    declarations: [CustomTranslatePipe],
    imports: [CommonModule],
    exports: [CustomTranslatePipe]
})
export class CustomTranslatePipeModule {}
