import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomIframeModule } from '@scaleo/offer-creative-shared-components-iframe';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { CreativePreviewComponent } from './creative-preview.component';

@NgModule({
    declarations: [CreativePreviewComponent],
    exports: [CreativePreviewComponent],
    imports: [CommonModule, CustomIframeModule, SharedModule, FieldTextInfoModule, UiButtonLinkModule]
})
export class CreativePreviewModule {}
