import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { PlatformCalendlyComponent } from './platform-calendly.component';

@NgModule({
    declarations: [PlatformCalendlyComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule],
    exports: [PlatformCalendlyComponent]
})
export class PlatformCalendlyModule {}
