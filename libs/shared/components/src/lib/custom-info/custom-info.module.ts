import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomInfoComponent } from './custom-info.component';

@NgModule({
    declarations: [CustomInfoComponent],
    exports: [CustomInfoComponent],
    imports: [CommonModule]
})
export class CustomInfoModule {}
