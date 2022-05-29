import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-short-list-in-column',
    templateUrl: './short-list-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortListColumnComponent {
    @Input() items: any[] = [];

    @Input() limit: number;

    @Input() templateRow: TemplateRef<any>;

    @Input() displayTooltip = true;

    @Input() templateTooltip: TemplateRef<any>;

    get itemsWithLimit(): any[] {
        if (this.limit && this.items && this.items.length > 0) {
            return this.items.slice(0, this.limit);
        }
        return this.items;
    }
}
