import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { FilterComponent } from './filter/filter.component';
import { FiltersComponent } from './filters.component';

@NgModule({
    declarations: [FiltersComponent, FilterComponent],
    exports: [FiltersComponent, FilterComponent],
    imports: [CommonModule, SharedModule, UiSvgIconModule, PlatformFormatPipeModule, UiButtonLinkModule]
})
export class FiltersModule {}
