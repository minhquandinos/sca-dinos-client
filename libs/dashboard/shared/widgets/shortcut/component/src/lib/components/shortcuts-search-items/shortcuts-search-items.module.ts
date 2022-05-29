import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomSearchModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ShortcutsSearchItemsComponent } from './shortcuts-search-items.component';

@NgModule({
    declarations: [ShortcutsSearchItemsComponent],
    exports: [ShortcutsSearchItemsComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, CustomSearchModule]
})
export class ShortcutsSearchItemsModule {}
