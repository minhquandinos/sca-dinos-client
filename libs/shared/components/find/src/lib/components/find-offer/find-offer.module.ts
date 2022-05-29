import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindOfferComponent } from './find-offer.component';

@NgModule({
    declarations: [FindOfferComponent],
    exports: [FindOfferComponent],
    imports: [CommonModule, SelectModule, SharedModule]
})
export class FindOfferModule {}
