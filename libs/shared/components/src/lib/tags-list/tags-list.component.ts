import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';

@Component({
    selector: 'app-tags-lists',
    templateUrl: './tags-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent {
    @Input() tags: BaseObjectModel[] | any;

    @Input() showAll: boolean;

    @Input() className = '';

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
