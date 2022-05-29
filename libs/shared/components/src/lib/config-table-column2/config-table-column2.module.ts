import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ConfigTableColumn2ItemComponent } from './components/config-table-column2-item/config-table-column2-item.component';
import { ConfigTableColumn2ListComponent } from './components/config-table-column2-list/config-table-column2-list.component';
import { ConfigTableColumn2Component } from './config-table-column2.component';
import { ConfigTableColumn2ItemCheckedDirective } from './directives/config-table-column2-item-checked.directive';
import { ConfigTableColumn2ItemRequiredDirective } from './directives/config-table-column2-item-required.directive';
import { ConfigTableColumn2ItemTooltipDirective } from './directives/config-table-column2-item-tooltip.directive';
import { ConfigTableColumn2SelectAllDirective } from './directives/config-table-column2-select-all.directive';
import { ConfigEntityTranslatePipe } from './pipes/config-entity-translate.pipe';

@NgModule({
    declarations: [
        ConfigTableColumn2Component,
        ConfigTableColumn2ItemComponent,
        ConfigTableColumn2ListComponent,
        ConfigTableColumn2ItemCheckedDirective,
        ConfigTableColumn2ItemRequiredDirective,
        ConfigTableColumn2ItemTooltipDirective,
        ConfigEntityTranslatePipe,
        ConfigTableColumn2SelectAllDirective
    ],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, UiSvgIconModule],
    exports: [ConfigTableColumn2Component]
})
export class ConfigTableColumn2Module {}
