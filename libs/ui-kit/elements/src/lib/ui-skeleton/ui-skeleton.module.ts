import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSkeletonComponent } from './ui-skeleton.component';
import { UiSkeletonBlockComponent } from './ui-skeleton-block/ui-skeleton-block.component';
import { UiSkeletonButtonComponent } from './ui-skeleton-button/ui-skeleton-button.component';
import { UiSkeletonCheckboxComponent } from './ui-skeleton-checkbox/ui-skeleton-checkbox.component';
import { UiSkeletonImageComponent } from './ui-skeleton-image/ui-skeleton-image.component';
import { UiSkeletonInputComponent } from './ui-skeleton-input/ui-skeleton-input.component';
import { UiSkeletonTextareaComponent } from './ui-skeleton-textarea/ui-skeleton-textarea.component';

@NgModule({
    declarations: [
        UiSkeletonComponent,
        UiSkeletonBlockComponent,
        UiSkeletonInputComponent,
        UiSkeletonTextareaComponent,
        UiSkeletonButtonComponent,
        UiSkeletonImageComponent,
        UiSkeletonCheckboxComponent
    ],
    exports: [
        UiSkeletonComponent,
        UiSkeletonBlockComponent,
        UiSkeletonInputComponent,
        UiSkeletonTextareaComponent,
        UiSkeletonButtonComponent,
        UiSkeletonImageComponent,
        UiSkeletonCheckboxComponent
    ],
    imports: [CommonModule]
})
export class UiSkeletonModule {}
