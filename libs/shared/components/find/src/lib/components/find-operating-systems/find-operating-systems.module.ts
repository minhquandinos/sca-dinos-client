import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindOperatingSystemsComponent } from './find-operating-systems.component';

@NgModule({
    declarations: [FindOperatingSystemsComponent],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindOperatingSystemsComponent]
})
export class FindOperatingSystemsModule {}
