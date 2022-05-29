import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomCheckboxModule } from '@scaleo/shared/components';
import { UiTooltipModule } from '@scaleo/ui-kit/elements/tooltip';

import { UiSkeletonModule } from '../ui-skeleton';
import { UiSpinnerModule } from '../ui-spinner/ui-spinner.module';
import { UiSvgIconModule } from '../ui-svg-icon';
import { UiTable2ColComponent } from './components/ui-table2-col/ui-table2-col.component';
import { UiTable2ColSelectComponent } from './components/ui-table2-col-select/ui-table2-col-select.component';
import { UiTable2ColTemplateComponent } from './components/ui-table2-col-template/ui-table2-col-template.component';
import { UiTable2HeaderComponent } from './components/ui-table2-header/ui-table2-header.component';
import { UiTable2HeaderColComponent } from './components/ui-table2-header-col/ui-table2-header-col.component';
import { UiTable2HeaderColItemComponent } from './components/ui-table2-header-col-item/ui-table2-header-col-item.component';
import { UiTable2HeaderColSelectComponent } from './components/ui-table2-header-col-select/ui-table2-header-col-select.component';
import { UiTable2ColumnShowTooltipPipe } from './components/ui-table2-header-col-tooltip/ui-table2-column-show-tooltip.pipe';
import { UiTable2ColumnTooltipTplPipe } from './components/ui-table2-header-col-tooltip/ui-table2-column-tooltip-tpl.pipe';
import { UiTable2HeaderColTooltipComponent } from './components/ui-table2-header-col-tooltip/ui-table2-header-col-tooltip.component';
import { UiTable2RowComponent } from './components/ui-table2-row/ui-table2-row.component';
import { UiTable2RowControlComponent } from './components/ui-table2-row-control/ui-table2-row-control.component';
import { UiTable2ScrollComponent } from './components/ui-table2-scroll/ui-table2-scroll.component';
import { UiTable2SortComponent } from './components/ui-table2-sort/ui-table2-sort.component';
import { UiTable2UpdateComponent } from './components/ui-table2-update/ui-table2-update.component';
import { UiTable2ColSelectDirective } from './directives/ui-table2-col-select.directive';
import { UiTable2ColTemplateDirective } from './directives/ui-table2-col-template.directive';
import { UiTable2HeaderColTooltipTemplateDirective } from './directives/ui-table2-header-col-tooltip-template.directive';
import { UiTable2ScrollDirective } from './directives/ui-table2-scroll.directive';
import { UiTable2ScrollEventDirective } from './directives/ui-table2-scroll-event.directive';
import { UiTable2ScrollShadowDirective } from './directives/ui-table2-scroll-shadow.directive';
import { UiTable2AttachTooltipsPipe } from './pipes/ui-table2-attach-tooltips.pipe';
import { UiTable2ColumnTranslatePipe } from './pipes/ui-table2-column-translate.pipe';
import { UiTable2Component } from './ui-table2.component';

@NgModule({
    declarations: [
        UiTable2Component,
        UiTable2RowComponent,
        UiTable2ColComponent,
        UiTable2HeaderComponent,
        UiTable2HeaderColComponent,
        UiTable2SortComponent,
        UiTable2ColTemplateComponent,
        UiTable2ColTemplateDirective,
        UiTable2ScrollComponent,
        UiTable2ScrollDirective,
        UiTable2ScrollEventDirective,
        UiTable2HeaderColSelectComponent,
        UiTable2ColSelectComponent,
        UiTable2ColSelectDirective,
        UiTable2UpdateComponent,
        UiTable2AttachTooltipsPipe,
        UiTable2ColumnTooltipTplPipe,
        UiTable2ColumnShowTooltipPipe,
        UiTable2HeaderColTooltipComponent,
        UiTable2HeaderColItemComponent,
        UiTable2HeaderColTooltipTemplateDirective,
        UiTable2RowControlComponent,
        UiTable2ColumnTranslatePipe,
        UiTable2ScrollShadowDirective
    ],
    imports: [CommonModule, UiSvgIconModule, SharedModule, CustomCheckboxModule, UiSkeletonModule, UiSpinnerModule, UiTooltipModule],
    exports: [
        UiTable2Component,
        UiTable2HeaderComponent,
        UiTable2ColTemplateComponent,
        UiTable2ColComponent,
        UiTable2ColTemplateDirective,
        UiTable2RowComponent,
        UiTable2HeaderColTooltipTemplateDirective
    ]
})
export class UiTable2Module {}
