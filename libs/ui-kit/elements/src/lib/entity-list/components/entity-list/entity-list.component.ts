import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { EntityListSearchComponent } from '../entity-list-search/entity-list-search.component';

@Component({
    selector: 'app-entity-list',
    templateUrl: './entity-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListComponent {
    @HostBinding('class') hostClass = 'entity-list';

    @Input() searchPlaceholder: string;

    @Input() searchDisabled = false;

    @Input() classNameListWarp: string;

    @ViewChild(EntityListSearchComponent)
    set _customSearchComponent(component: EntityListSearchComponent) {
        if (component) {
            this.customSearchComponent = component;
        }
    }

    customSearchComponent: EntityListSearchComponent;

    notFound: Observable<string> = this.translate.stream('interface.basic.not_found');

    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    constructor(private translate: TranslateService) {}

    searching(value: string) {
        this.search.emit(value);
    }
}
