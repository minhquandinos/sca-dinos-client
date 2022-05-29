import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ConfigTableColumnComponent } from './config-table-column.component';
import { ConfigTableColumnService } from './config-table-column.service';
import { ConfigTableColumnItemComponent } from './config-table-column-item/config-table-column-item.component';
import { ConfigTableColumnListComponent } from './config-table-column-list/config-table-column-list.component';

@NgModule({
    declarations: [ConfigTableColumnComponent, ConfigTableColumnItemComponent, ConfigTableColumnListComponent],
    exports: [ConfigTableColumnComponent],
    imports: [CommonModule, UiSvgIconModule, SharedModule, UiButtonLinkModule],
    providers: [ConfigTableColumnService]
})
export class ConfigTableColumnModule {}
