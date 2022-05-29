import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiPageWrapperHeaderColorDirective } from './directives/ui-page-wrapper-header-color.directive';
import { UiPageWrapperComponent } from './ui-page-wrapper.component';
import { UiPageWrapperContentComponent } from './ui-page-wrapper-content/ui-page-wrapper-content.component';
import { UiPageWrapperFooterComponent } from './ui-page-wrapper-footer/ui-page-wrapper-footer.component';
import { UiPageWrapperHeaderComponent } from './ui-page-wrapper-header/ui-page-wrapper-header.component';

@NgModule({
    declarations: [
        UiPageWrapperComponent,
        UiPageWrapperContentComponent,
        UiPageWrapperHeaderComponent,
        UiPageWrapperFooterComponent,
        UiPageWrapperHeaderColorDirective
    ],
    exports: [
        UiPageWrapperComponent,
        UiPageWrapperContentComponent,
        UiPageWrapperHeaderComponent,
        UiPageWrapperFooterComponent,
        UiPageWrapperHeaderColorDirective
    ],
    imports: [CommonModule]
})
export class UiPageWrapperModule {}
