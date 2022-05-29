import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomSearchModule, NotFoundModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiChipModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { MultiSelectItemTemplateDirective } from './directives/multi-select-item-template.directive';
import { MultiSelectBlockComponent } from './multi-select-block.component';
import { MultiSelectItemsExcludePipe } from './pipes/multi-select-items-exclude.pipe';

@NgModule({
    declarations: [MultiSelectBlockComponent, MultiSelectItemsExcludePipe, MultiSelectItemTemplateDirective],
    imports: [
        CommonModule,
        UiChipModule,
        UiSvgIconModule,
        UiButtonLinkModule,
        FormsModule,
        CustomSearchModule,
        NotFoundModule,
        SharedModule
    ],
    exports: [MultiSelectBlockComponent, MultiSelectItemTemplateDirective]
})
export class MultiSelectBlockModule {}
