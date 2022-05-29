import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { CustomSearchComponent } from './custom-search.component';

@NgModule({
    imports: [CommonModule, SharedModule, UiSvgIconModule],
    declarations: [CustomSearchComponent],
    providers: [],
    exports: [CommonModule, CustomSearchComponent]
})
export class CustomSearchModule {}
