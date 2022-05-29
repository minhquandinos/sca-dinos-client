import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContainerShadowComponent } from './container-shadow.component';

@NgModule({
    declarations: [ContainerShadowComponent],
    exports: [ContainerShadowComponent],
    imports: [CommonModule]
})
export class ContainerShadowModule {}
