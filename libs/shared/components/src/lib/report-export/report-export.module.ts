import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { DropdownEntityMenuModule } from '../../../../../ui-kit/elements/src/lib/dropdown-entity-menu/dropdown-entity-menu.module';
import { ReportExportComponent } from './report-export.component';

@NgModule({
    declarations: [ReportExportComponent],
    imports: [CommonModule, DropdownEntityMenuModule, SharedModule],
    exports: [ReportExportComponent]
})
export class ReportExportModule {}
