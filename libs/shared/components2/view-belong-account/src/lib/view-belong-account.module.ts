import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ViewBelongAccountComponent } from './components/view-belong-account.component';

@NgModule({
    declarations: [ViewBelongAccountComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule]
})
export class ViewBelongAccountModule {
}
