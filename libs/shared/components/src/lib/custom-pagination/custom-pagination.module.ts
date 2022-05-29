import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { DropdownListModule } from '../dropdown-list/dropdown-list.module';
import { CustomPaginationComponent } from './custom-pagination.component';

@NgModule({
    declarations: [CustomPaginationComponent],
    exports: [CommonModule, CustomPaginationComponent],
    imports: [CommonModule, DropdownListModule, SharedModule, UiSvgIconModule]
})
export class CustomPaginationModule {}
