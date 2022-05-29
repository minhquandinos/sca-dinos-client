import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { HintCreateFirstItemComponent } from './hint-create-first-item.component';

@NgModule({
    declarations: [HintCreateFirstItemComponent],
    exports: [HintCreateFirstItemComponent],
    imports: [CommonModule, UiPageWrapperModule, SharedModule, UiSvgIconModule]
})
export class HintCreateFirstItemModule {}
