import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { ConfigTableColumn2Service } from '../config-table-column2.service';
import { ConfigTableColumn2Model } from '../models/config-table-column2.model';

@Directive({
    selector: '[appConfigTableColumn2ItemChecked]',
    providers: [UnsubscribeService]
})
export class ConfigTableColumn2ItemCheckedDirective implements OnInit {
    @Input() param: ConfigTableColumn2Model;

    @HostListener('click', ['$event'])
    click(event) {
        this.configTableColumn2Service.updateCheckedColumns(this.param.key, event.target.checked);
    }

    constructor(
        private elementRef: ElementRef,
        private configTableColumn2Service: ConfigTableColumn2Service,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.configTableColumn2Service.allColumn$.pipe(takeUntil(this.unsubscribe)).subscribe((columns) => {
            const isColumnChecked = columns.some((column) => column.checked && column.key === this.param.key);
            this.elementRef.nativeElement.checked = isColumnChecked;
        });
    }
}
