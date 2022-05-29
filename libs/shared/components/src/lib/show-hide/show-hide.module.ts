import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ShowHideComponent } from './show-hide.component';

@NgModule({
    declarations: [ShowHideComponent],
    exports: [ShowHideComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule]
})
export class ShowHideModule {}
