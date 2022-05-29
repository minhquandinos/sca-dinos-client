import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiDropdownEntityModule } from '@scaleo/ui-kit/components/dropdown-entity';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ReportCurrencyComponent } from './report-currency.component';

@NgModule({
    declarations: [ReportCurrencyComponent],
    imports: [CommonModule, UiDropdownEntityModule, UiButtonLinkModule],
    exports: [ReportCurrencyComponent]
})
export class ReportCurrencyModule {}
