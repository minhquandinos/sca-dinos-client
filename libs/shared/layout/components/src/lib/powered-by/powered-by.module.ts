import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { PoweredByComponent } from './powered-by.component';

@NgModule({
    declarations: [PoweredByComponent],
    imports: [CommonModule, SharedModule],
    exports: [PoweredByComponent]
})
export class PoweredByModule {}
