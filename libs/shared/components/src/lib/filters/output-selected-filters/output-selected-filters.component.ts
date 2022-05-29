import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO move component to lib and fixed this import
import { BaseFind3Component } from '../../../../find/src/lib/base-find3.component';
import { OutputSelectedFiltersModel } from './output-selected-filters.model';

@Component({
    selector: 'app-output-selected-filters',
    templateUrl: './output-selected-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputSelectedFiltersComponent implements OnChanges {
    @Input() selected: OutputSelectedFiltersModel[] | any[] = [];

    @Input() title: string;

    @Input() itemTitle = 'title';

    @Input() itemValue = 'id';

    @Input() itemStyle: 'rectangle' | 'rounded' = 'rectangle';

    @Input() showImage: boolean;

    @Input() sliceCounter: number;

    @Input() itemTemplate: TemplateRef<any>;

    @Input() findComponent: BaseFind3Component<any>;

    /*
     * @deprecated Use remove or clear emitter
     */
    @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() remove: EventEmitter<string | number> = new EventEmitter<string | number>();

    @Output() clear: EventEmitter<boolean> = new EventEmitter<boolean>();

    selected2$: Observable<OutputSelectedFiltersModel[] | any[]>;

    ngOnChanges(changes: SimpleChanges) {
        const { selected } = changes;

        if (selected?.currentValue) {
            let selected2$;
            if (this.findComponent) {
                selected2$ = this.findComponent?.selectedFull$.pipe(
                    map((elements) => {
                        if (Array.isArray(elements)) {
                            return elements?.filter((elem: any) => selected?.currentValue.includes(elem?.[this.itemValue]));
                        }
                        return selected?.currentValue.includes((elements as any)?.[this.itemValue]);
                    })
                );
            } else {
                selected2$ = of(selected.currentValue);
            }

            this.selected2$ = selected2$;
        }
    }

    public removeHandler(id: string | number) {
        /*
         * @deprecated Use remove or clear emitter
         */
        const selected = this.selected.filter((obj) => obj.id !== id);
        this.toggle.emit(selected);

        this.remove.emit(id);
    }

    public clearHandler() {
        this.toggle.emit([]);
        this.clear.emit(true);
    }
}
