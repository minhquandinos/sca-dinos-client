import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiLoaderComponent } from './ui-loader.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UiLoaderComponent],
    exports: [UiLoaderComponent]
})
export class UiLoaderModule {}
