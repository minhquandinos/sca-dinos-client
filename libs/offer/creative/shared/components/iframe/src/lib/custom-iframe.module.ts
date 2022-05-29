import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomIframeComponent } from './custom-iframe.component';

@NgModule({
    declarations: [CustomIframeComponent],
    exports: [CustomIframeComponent],
    imports: [CommonModule]
})
export class CustomIframeModule {}
