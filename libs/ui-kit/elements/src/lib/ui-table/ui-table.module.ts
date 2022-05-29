import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomCheckboxModule } from '@scaleo/shared/components';
import { UiFakeArrayPipeModule } from '@scaleo/ui-kit/pipes';

import { UiSkeletonModule } from '../ui-skeleton';
import { UiStatusColorModule } from '../ui-status-color/ui-status-color.module';
import { UiSvgIconModule } from '../ui-svg-icon';
import { UiTableComponent } from './ui-table.component';
import { UiTableColModule } from './ui-table-col/ui-table-col.module';
import { UiTableHeaderComponent } from './ui-table-header/ui-table-header.component';
import { UiTableRowComponent } from './ui-table-row/ui-table-row.component';
import { TableNavigationModule } from './widgets/table-navigation/table-navigation.module';

@NgModule({
    declarations: [UiTableComponent, UiTableHeaderComponent, UiTableRowComponent],
    exports: [UiTableComponent, UiTableRowComponent, TableNavigationModule, UiTableColModule],
    imports: [
        CommonModule,
        UiStatusColorModule,
        SharedModule,
        RouterModule,
        TableNavigationModule,
        UiSvgIconModule,
        CustomCheckboxModule,
        UiTableColModule,
        UiSkeletonModule,
        UiFakeArrayPipeModule
    ]
})
export class UiTableModule {}
