import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { FiltersModule } from '@scaleo/shared/components';
import { UiDropdownEntityModule } from '@scaleo/ui-kit/components/dropdown-entity';
import { DropdownMenuModule, EntityListModule, UiButtonLinkModule, UiChipModule } from '@scaleo/ui-kit/elements';

import { NewStatisticsSelectedGroupComponent } from './components/new-statistics-selected-group/new-statistics-selected-group.component';
import { NewStatisticsGroupSearchPipe } from './components/new-statistics-selection-group/new-statistics-group-search.pipe';
import { NewStatisticsSelectionGroupComponent } from './components/new-statistics-selection-group/new-statistics-selection-group.component';
import { NewStatisticsGroupComponent } from './containers/new-statistics-group/new-statistics-group.component';

@NgModule({
    declarations: [
        NewStatisticsGroupComponent,
        NewStatisticsGroupSearchPipe,
        NewStatisticsSelectedGroupComponent,
        NewStatisticsSelectionGroupComponent
    ],
    imports: [
        CommonModule,
        DropdownMenuModule,
        UiButtonLinkModule,
        UiChipModule,
        EntityListModule,
        UiDropdownEntityModule,
        SharedModule,
        FiltersModule
    ],
    exports: [NewStatisticsGroupComponent]
})
export class NewStatisticsGroupModule {}
