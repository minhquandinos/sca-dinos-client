import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiTabNavBarComponent } from './ui-tab-nav-bar.component';
import { UiTabNavLinkComponent } from './ui-tab-nav-link.component';

@NgModule({
    declarations: [UiTabNavBarComponent, UiTabNavLinkComponent],
    imports: [CommonModule],
    exports: [UiTabNavBarComponent, UiTabNavLinkComponent]
})
export class UiTabNavBarModule {}
