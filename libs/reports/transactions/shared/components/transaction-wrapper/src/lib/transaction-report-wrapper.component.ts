import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

@Component({
    selector: 'scaleo-transaction-report-wrapper',
    templateUrl: './transaction-report-wrapper.component.html',
    providers: [UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionReportWrapperComponent {
    @Input() loading: boolean;

    @Input() pagination: ApiPaginationModel;

    @Input() actionHeaderTemplate?: TemplateRef<HTMLElement>;

    @Input() defaultHeaderTemplate: TemplateRef<HTMLElement>;

    @Input() set totalCount(totalCount: number) {
        this.showPagination = totalCount > 10;
        this.cdr.detectChanges();
    }

    @Input()
    selectedItems?: string[];

    @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

    @Output() changePerPage: EventEmitter<number> = new EventEmitter<number>();

    showPagination: boolean;

    hasSelectedItems: boolean;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    pageWasChanged(page: number): void {
        this.changePage.emit(page);
    }

    perPageWasChanged(perPage: number): void {
        this.changePerPage.emit(perPage);
    }
}
