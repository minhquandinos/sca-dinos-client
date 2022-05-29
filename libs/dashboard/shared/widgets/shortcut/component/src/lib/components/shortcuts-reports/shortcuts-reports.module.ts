import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ShortcutsReportsComponent } from './shortcuts-reports.component';

@NgModule({
    declarations: [ShortcutsReportsComponent],
    exports: [ShortcutsReportsComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule]
})
export class ShortcutsReportsModule {}
