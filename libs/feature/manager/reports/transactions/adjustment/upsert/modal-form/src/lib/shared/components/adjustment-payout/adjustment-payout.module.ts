import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { FindGoalsModule, FindOfferModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';

import { AdjustmentPayoutComponent } from './adjustment-payout.component';

@NgModule({
    declarations: [AdjustmentPayoutComponent],
    imports: [CommonModule, SharedModule, SelectModule, InputModule, FindOfferModule, FindGoalsModule],
    exports: [AdjustmentPayoutComponent]
})
export class AdjustmentPayoutModule {}
