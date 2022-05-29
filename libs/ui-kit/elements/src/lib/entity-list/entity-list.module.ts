import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiSvgIconModule } from '../ui-svg-icon';
import { EntityGroupComponent } from './components/entity-group/entity-group.component';
import { EntityItemComponent } from './components/entity-item/entity-item.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityListSearchComponent } from './components/entity-list-search/entity-list-search.component';
import { EntityItemTemplateDirective } from './entity-item-template.directive';

@NgModule({
    declarations: [EntityListComponent, EntityGroupComponent, EntityItemComponent, EntityItemTemplateDirective, EntityListSearchComponent],
    imports: [CommonModule, UiSvgIconModule, SharedModule],
    exports: [EntityListComponent, EntityGroupComponent, EntityItemComponent, EntityItemTemplateDirective]
})
export class EntityListModule {}
