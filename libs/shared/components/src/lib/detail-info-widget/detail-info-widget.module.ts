import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CardWidgetModule } from '@scaleo/shared/components';
import { DetailInfoModule, UiImageModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { DetailInfoWidgetContentComponent } from './components/detail-info-widget-content.component';
import { DetailInfoWidgetHeaderComponent } from './components/detail-info-widget-header.component';
import { DetailInfoWidgetComponent } from './detail-info-widget.component';

@NgModule({
    declarations: [DetailInfoWidgetComponent, DetailInfoWidgetHeaderComponent, DetailInfoWidgetContentComponent],
    imports: [CommonModule, CardWidgetModule, UiImageModule, SharedModule, UiSkeletonModule, DetailInfoModule],
    exports: [DetailInfoWidgetComponent, DetailInfoWidgetHeaderComponent, DetailInfoWidgetContentComponent]
})
export class DetailInfoWidgetModule {}
