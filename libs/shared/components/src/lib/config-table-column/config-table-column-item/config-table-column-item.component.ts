import { Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigTableColumnComponent } from '../config-table-column.component';
import { StatisticParamInterface } from '../config-table-column.model';
import { ConfigTableColumnService } from '../config-table-column.service';

@Component({
    selector: 'app-config-table-column-item',
    templateUrl: './config-table-column-item.component.html'
})
export class ConfigTableColumnItemComponent implements OnInit {
    @Input() param: StatisticParamInterface;

    configTableColumnComponent: ConfigTableColumnComponent;

    disabled: Observable<boolean>;

    require: Observable<boolean>;

    constructor(
        public configColumn: ConfigTableColumnService,
        @Inject(forwardRef((): any => ConfigTableColumnComponent)) private parentComponent: ConfigTableColumnComponent
    ) {
        this.configTableColumnComponent = parentComponent;
    }

    ngOnInit(): void {
        this.disabled = this.configColumn.selectedItem.pipe(
            map((num) => {
                if (this.configTableColumnComponent.max > 0) {
                    if (num >= this.configTableColumnComponent.max) {
                        return true;
                    }
                }
                return false;
            })
        );

        this.require = this.configColumn.columnsRequire.pipe(
            map((req) => {
                const isRequire = req.find((item) => item === this.param.key);
                return !!isRequire;
            })
        );
    }

    checked() {
        this.param.selected = !this.param.selected;
        this.configTableColumnComponent.countSelectedItem();
    }

    showMessageWhenMax() {
        const check = this.configTableColumnComponent.configTableColumnService.selectedItem.value;
        const counter = this.configTableColumnComponent.configTableColumnService.clickCounter.value;

        if (check >= 6) {
            this.configTableColumnComponent.configTableColumnService.clickCounter.next(counter === 0 ? counter + check + 1 : counter + 1);
        } else if (check < 6) {
            this.configTableColumnComponent.configTableColumnService.clickCounter.next(check);
        }

        if (this.configTableColumnComponent.configTableColumnService.clickCounter.value >= 7) {
            this.configTableColumnComponent.configTableColumnService.showMessageWhenMax.next(true);
        } else {
            this.configTableColumnComponent.configTableColumnService.showMessageWhenMax.next(false);
        }
    }
}
