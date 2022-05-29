import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ShortcutsAddItemsComponent } from './shortcuts-add-items.component';

@NgModule({
    declarations: [ShortcutsAddItemsComponent],
    exports: [ShortcutsAddItemsComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule]
})
export class ShortcutsAddItemsModule {}
