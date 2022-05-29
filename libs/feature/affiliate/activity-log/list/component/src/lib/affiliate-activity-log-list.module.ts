import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivityModule } from '@scaleo/activity-log/shared/components/activity';
import { ActivityLogUserModule } from '@scaleo/activity-log/shared/components/activity-log-user';
import { ActivityLogListModule } from '@scaleo/activity-log/shared/components/list';
import { SharedModule } from '@scaleo/core/shared/module';
import { CountryFlagModule, CustomDateRangeModule, DateVariantModule, FiltersModule, ResultCountModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateActivityListComponent } from './affiliate-activity-list.component';

@NgModule({
    declarations: [AffiliateActivityListComponent],
    imports: [
        CommonModule,
        ActivityLogListModule,
        SharedModule,
        UiSvgIconModule,
        CountryFlagModule,
        ActivityModule,
        ActivityLogUserModule,
        DateVariantModule,
        ResultCountModule,
        CustomDateRangeModule,
        FiltersModule
    ],
    exports: [AffiliateActivityListComponent]
})
export class AffiliateActivityLogListModule {}
