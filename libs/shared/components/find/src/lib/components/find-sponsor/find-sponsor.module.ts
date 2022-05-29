import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindSponsorComponent } from './find-sponsor.component';

@NgModule({
    declarations: [FindSponsorComponent],
    imports: [CommonModule, SelectModule, SharedModule],
    exports: [FindSponsorComponent]
})
export class FindSponsorModule {}
