import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ShortcutsAddItemsModule } from './components/shortcuts-add-items/shortcuts-add-items.module';
import { ShortcutsReportsModule } from './components/shortcuts-reports/shortcuts-reports.module';
import { ShortcutsSearchItemsModule } from './components/shortcuts-search-items/shortcuts-search-items.module';
import { ShortcutsWidgetComponent } from './shortcuts-widget.component';

@NgModule({
    declarations: [ShortcutsWidgetComponent],
    imports: [
        CommonModule,
        ContainerWidgetModule,
        ShortcutsSearchItemsModule,
        SharedModule,
        UiButtonLinkModule,
        RouterModule,
        ShortcutsAddItemsModule,
        ShortcutsReportsModule
    ],
    exports: [ShortcutsWidgetComponent]
})
export class ShortcutsWidgetModule {}
