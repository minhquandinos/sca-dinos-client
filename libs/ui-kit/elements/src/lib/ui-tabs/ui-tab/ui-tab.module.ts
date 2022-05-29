import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiTabBodyComponent } from './components/ui-tab-body.component';
import { UiTabComponent } from './components/ui-tab-component/ui-tab.component';
import { UiTabItemComponent } from './components/ui-tab-item.component';
import { UiTabLabelComponent } from './components/ui-tab-label.component';
import { UiTabBodyDirective } from './directives/ui-tab-body.directive';

@NgModule({
    declarations: [UiTabComponent, UiTabItemComponent, UiTabBodyDirective, UiTabLabelComponent, UiTabBodyComponent],
    imports: [CommonModule],
    exports: [UiTabComponent, UiTabItemComponent, UiTabBodyDirective, UiTabLabelComponent, UiTabBodyComponent]
})
export class UiTabModule {}
