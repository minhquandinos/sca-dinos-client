import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavigateRootPipe } from './navigate-root.pipe';

@NgModule({
    declarations: [NavigateRootPipe],
    imports: [CommonModule],
    exports: [NavigateRootPipe]
})
export class NavigateRootModule {}
