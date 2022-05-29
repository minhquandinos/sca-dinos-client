import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

// TODO nx refactor it is copied from component CustomSearchComponent
@Component({
    selector: 'ui-entity-list-search',
    templateUrl: './entity-list-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListSearchComponent {
    @Input() placeholder: string;

    @Output() toggleSearch: EventEmitter<string> = new EventEmitter<string>();

    public search: string;

    haveText: boolean;

    constructor() {}

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        this.haveText = !!value;
    }

    public initFilterSearch() {
        if (this.search?.length < 1) {
            this.toggleSearch.emit('');
        } else {
            this.toggleSearch.emit(this.search);
        }
    }

    clear() {
        this.search = null;
        this.haveText = false;
        this.toggleSearch.emit('');
    }
}
