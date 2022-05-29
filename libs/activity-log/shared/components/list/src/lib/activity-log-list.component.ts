import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ActivityLogInterface } from '@scaleo/activity-log/common';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-activity-log-list',
    templateUrl: './activity-log-list.component.html',
    providers: [UnsubscribeService]
})
export class ActivityLogListComponent {
    @Input()
    items: ActivityLogInterface[] = [];

    @Input()
    pagination: ApiPaginationModel;

    @Input()
    initialDate: CustomDateRangeModel;

    @Input()
    rowTemplate: TemplateRef<any>;

    @Input()
    headers: string[] | UiTableHeaderInterface[] = [];

    @Input()
    loading = true;

    @Output()
    dateWasChanged: EventEmitter<CustomDateRangeModel> = new EventEmitter<CustomDateRangeModel>();

    @Output()
    pageWasChanged: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    perPageWasChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        protected customDateRangeService: CustomDateRangeService,
        protected platformListsService: PlatformListsService,
        protected fomBuilder: FormBuilder,
        public shared: SharedMethodsService,
        public profileQuery: ProfileQuery,
        protected translateService: TranslateService
    ) {}

    dateChange(date: CustomDateRangeModel) {
        this.dateWasChanged.emit({
            rangeFrom: date.rangeFrom,
            rangeTo: date.rangeTo
        });
    }

    pageChange(page: number): void {
        this.pageWasChanged.emit(page);
    }

    perPageChange(perPage: number) {
        this.perPageWasChange.emit(perPage);
    }
}
