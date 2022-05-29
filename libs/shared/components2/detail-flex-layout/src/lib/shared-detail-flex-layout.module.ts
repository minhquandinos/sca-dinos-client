import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { StickyModule } from '@scaleo/shared/directives';

import { DetailFlexLayoutComponent } from './detail-flex-layout.component';

@NgModule({
    imports: [CommonModule, FlexModule, StickyModule],
    declarations: [DetailFlexLayoutComponent],
    exports: [DetailFlexLayoutComponent]
})
export class SharedDetailFlexLayoutModule {}
