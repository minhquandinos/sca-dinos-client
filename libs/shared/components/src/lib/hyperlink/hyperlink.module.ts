import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HyperlinkComponent } from './hyperlink.component';

@NgModule({
    declarations: [HyperlinkComponent],
    imports: [CommonModule, RouterModule],
    exports: [HyperlinkComponent]
})
export class HyperlinkModule {}
