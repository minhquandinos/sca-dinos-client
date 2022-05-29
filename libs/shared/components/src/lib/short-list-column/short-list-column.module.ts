import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ShortListColumnComponent } from './short-list-column.component';

@NgModule({
    declarations: [ShortListColumnComponent],
    imports: [CommonModule, UiSvgIconModule, SharedModule],
    exports: [ShortListColumnComponent]
})
export class ShortListColumnModule {}
