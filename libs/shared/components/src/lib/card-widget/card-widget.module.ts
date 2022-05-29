import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { CardWidgetComponent } from './card-widget.component';
import { CardWidgetBottomPaddingDirective } from './card-widget-bottom-padding.directive';
import { CardWidgetContentComponent } from './card-widget-content.component';
import { CardWidgetFooterComponent } from './card-widget-footer.component';
import { CardWidgetHeaderComponent } from './card-widget-header.component';

@NgModule({
    declarations: [
        CardWidgetComponent,
        CardWidgetHeaderComponent,
        CardWidgetFooterComponent,
        CardWidgetContentComponent,
        CardWidgetBottomPaddingDirective
    ],
    exports: [CardWidgetComponent, CardWidgetHeaderComponent, CardWidgetFooterComponent, CardWidgetContentComponent],
    imports: [CommonModule, UiPageWrapperModule]
})
export class CardWidgetModule {}
