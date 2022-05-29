import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { LinkToModalInfoComponent } from './link-to-modal-info.component';

@NgModule({
    declarations: [LinkToModalInfoComponent],
    exports: [LinkToModalInfoComponent],
    imports: [CommonModule, UiButtonLinkModule]
})
export class LinkToModalInfoModule {}
