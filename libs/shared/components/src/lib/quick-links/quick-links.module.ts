import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { QuickLinkComponent } from './components/quick-link.component';
import { QuickLinksComponent } from './quick-links.component';

@NgModule({
    declarations: [QuickLinksComponent, QuickLinkComponent],
    exports: [QuickLinksComponent, QuickLinkComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule]
})
export class QuickLinksModule {}
