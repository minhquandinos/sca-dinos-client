import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AllowedTagsComponent } from './allowed-tags.component';

@NgModule({
    declarations: [AllowedTagsComponent],
    imports: [CommonModule],
    exports: [AllowedTagsComponent]
})
export class AllowedTagsModule {}
