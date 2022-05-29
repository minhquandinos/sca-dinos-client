import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiAlertModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { RefreshVersionComponent } from './refresh-version.component';

@NgModule({
    declarations: [RefreshVersionComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, UiAlertModule],
    exports: [RefreshVersionComponent]
})
export class RefreshVersionModule {}
