import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { ManagerOfferDuplicateComponent } from './manager-offer-duplicate.component';

@NgModule({
    declarations: [ManagerOfferDuplicateComponent],
    imports: [CommonModule, SharedModule],
    exports: [ManagerOfferDuplicateComponent]
})
export class ManagerOfferDuplicateModule {}
