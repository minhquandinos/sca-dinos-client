import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindGoalsComponent } from './find-goals.component';

@NgModule({
    declarations: [FindGoalsComponent],
    exports: [FindGoalsComponent],
    imports: [CommonModule, SharedModule, SelectModule, PlatformFormatPipeModule]
})
export class FindGoalsModule {}
