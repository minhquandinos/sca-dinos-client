import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultImagePipe } from './default-image.pipe';

@NgModule({
    declarations: [DefaultImagePipe],
    exports: [DefaultImagePipe],
    imports: [CommonModule]
})
export class DefaultImageModule {}
