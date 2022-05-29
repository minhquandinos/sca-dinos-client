import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiFakeArrayPipeModule } from '@scaleo/ui-kit/pipes';

import { UiSkeletonModule } from '../ui-skeleton';
import { UiSimpleTableColComponent } from './components/ui-simple-table-col/ui-simple-table-col.component';
import { UiSimpleTableRowComponent } from './components/ui-simple-table-row/ui-simple-table-row.component';
import { UiSimpleTableColTplDirective } from './directives/ui-simple-table-col-tpl.directive';
import { UiSimpleTableComponent } from './ui-simple-table.component';

@NgModule({
    declarations: [UiSimpleTableComponent, UiSimpleTableRowComponent, UiSimpleTableColComponent, UiSimpleTableColTplDirective],
    imports: [CommonModule, UiSkeletonModule, SharedModule, UiFakeArrayPipeModule],
    exports: [UiSimpleTableComponent, UiSimpleTableRowComponent, UiSimpleTableColComponent, UiSimpleTableColTplDirective]
})
export class UiSimpleTableModule {}
