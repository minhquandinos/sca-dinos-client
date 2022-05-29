import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { LinkBuilderAddSubIdComponent } from './link-builder-add-sub-id.component';

@NgModule({
    declarations: [LinkBuilderAddSubIdComponent],
    imports: [CommonModule, SharedModule, InputModule, UiButtonLinkModule],
    exports: [LinkBuilderAddSubIdComponent]
})
export class LinkBuilderAddSubIdModule {}
