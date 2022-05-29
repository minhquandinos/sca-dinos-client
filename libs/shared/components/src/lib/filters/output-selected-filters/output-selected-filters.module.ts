import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiChipModule } from '../../../../../../ui-kit/elements/src/lib/ui-chip/ui-chip.module';
import { UiImageModule } from '../../../../../../ui-kit/elements/src/lib/ui-image/ui-image.module';
import { OutputSelectedFiltersComponent } from './output-selected-filters.component';

@NgModule({
    imports: [CommonModule, SharedModule, UiImageModule, UiChipModule],
    declarations: [OutputSelectedFiltersComponent],
    providers: [],
    exports: [CommonModule, OutputSelectedFiltersComponent]
})
export class OutputSelectedFiltersModule {}
