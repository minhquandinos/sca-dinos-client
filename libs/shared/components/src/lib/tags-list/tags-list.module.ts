import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiChipModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { TagsListSortedPipe } from './pipes/tags-list-sorted.pipe';
import { TagsListTakePipe } from './pipes/tags-list-take.pipe';
import { TagsListTooltipPipe } from './pipes/tags-list-tooltip.pipe';
import { TagsListComponent } from './tags-list.component';

@NgModule({
    declarations: [TagsListComponent, TagsListSortedPipe, TagsListTakePipe, TagsListTooltipPipe],
    imports: [CommonModule, SharedModule, UiChipModule, UiSvgIconModule],
    exports: [TagsListComponent]
})
export class TagsListModule {}
