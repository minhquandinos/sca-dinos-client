import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ActionWidgetComponent } from './action-widget.component';

@NgModule({
    declarations: [ActionWidgetComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule],
    exports: [ActionWidgetComponent]
})
export class ActionWidgetModule {}
