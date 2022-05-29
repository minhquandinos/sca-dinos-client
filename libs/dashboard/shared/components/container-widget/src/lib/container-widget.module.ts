import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ActionWidgetModule } from './components/action-widget/action-widget.module';
import { ContainerWidgetComponent } from './container-widget.component';

@NgModule({
    declarations: [ContainerWidgetComponent],
    imports: [CommonModule, UiPageWrapperModule, UiSvgIconModule],
    exports: [ContainerWidgetComponent, ActionWidgetModule]
})
export class ContainerWidgetModule {}
