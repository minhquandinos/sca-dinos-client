import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindSmartLinkComponent } from './find-smart-link.component';

@NgModule({
    declarations: [FindSmartLinkComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindSmartLinkComponent]
})
export class FindSmartLinkModule {}
