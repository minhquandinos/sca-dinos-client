import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    ConfigTableColumn2Module,
    CustomDateRangeModule,
    CustomPaginationModule,
    DropdownPopupModule,
    FiltersModule,
    HyperlinkModule,
    NavigateRootModule,
    OutputSelectedFiltersModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { FindAffiliatesModule, FindOfferModule } from '@scaleo/shared/components/find';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiDividerModule, UiPageWrapperModule, UiTable2Module, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { LeadsLogsComponent } from './leads-logs/leads-logs.component';
import { LeadsLogsFiltersComponent } from './leads-logs-filters/leads-logs-filters.component';

@NgModule({
    declarations: [LeadsLogsComponent, LeadsLogsFiltersComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        ConfigTableColumn2Module,
        CustomPaginationModule,
        UiTable2Module,
        CustomDateRangeModule,
        SharedModule,
        ResultCountModule,
        PlatformFormatPipeModule,
        UiTabNavBarModule,
        NavigateRootModule,
        UiDividerModule,
        FiltersModule,
        DropdownPopupModule,
        FindAffiliatesModule,
        FindOfferModule,
        OutputSelectedFiltersModule,
        HyperlinkModule,
        PregMatchPipeModule
    ]
})
export class ManagerLeadsLogsListModule {}
