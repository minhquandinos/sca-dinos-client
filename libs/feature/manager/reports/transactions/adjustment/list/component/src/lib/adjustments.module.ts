import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAdjustmentUpsertModule } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { CustomDateRangeModule, CustomPaginationModule, CustomSearchModule, FiltersModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import {
    UiButtonLinkModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTable2Module,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { AdjustmentsComponent } from './adjustments.component';
import { ReportAdjustmentDetailFormatFieldModule } from './shared/components/report-adjustment-detail-format-field/report-adjustment-detail-format-field.module';
import { AdjustmentActionPipe } from './shared/pipes/adjustment-action.pipe';

@NgModule({
    declarations: [AdjustmentsComponent, AdjustmentActionPipe],
    imports: [
        CommonModule,
        RouterModule,
        UiPageWrapperModule,
        CustomDateRangeModule,
        UiButtonLinkModule,
        FiltersModule,
        CustomPaginationModule,
        UiSkeletonModule,
        UiTableModule,
        CustomSearchModule,
        SharedModule,
        ManagerAdjustmentUpsertModule,
        ReportAdjustmentDetailFormatFieldModule,
        UiSvgIconModule,
        PlatformFormatPipeModule,
        PlatformStatusesModule,
        UiTable2Module,
        TruncateTextPipeModule,
        FindPlatformStatusesModule
    ],
    exports: [AdjustmentsComponent]
})
export class AdjustmentsModule {}
