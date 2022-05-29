import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSnackBarContainerComponent } from './components/ui-snack-bar-container.component';

@NgModule({
    declarations: [UiSnackBarContainerComponent],
    imports: [CommonModule, OverlayModule]
})
export class UiSnackBarModule {}
