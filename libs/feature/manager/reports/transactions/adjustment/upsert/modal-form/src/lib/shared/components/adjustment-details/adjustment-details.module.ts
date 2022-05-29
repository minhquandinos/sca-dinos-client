import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomDateRangeModule, InputModule } from '@scaleo/shared/components';
import { FindAffiliatesModule, FindGoalsModule, FindOfferModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';

import { AdjustmentDetailsComponent } from './adjustment-details.component';

@NgModule({
    declarations: [AdjustmentDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        SelectModule,
        InputModule,
        FindAffiliatesModule,
        FindOfferModule,
        FindGoalsModule,
        CustomDateRangeModule,
        FindPlatformStatusesModule
    ],
    exports: [AdjustmentDetailsComponent]
})
export class AdjustmentDetailsModule {}
