import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { BaseFind3Component, BaseFindRequestModel } from '@scaleo/shared/components/find';
import { SelectComponent } from '@scaleo/shared/components/select';

import { ExtendedValuesType } from './models/report-filters-selected-composite-filter.model';
import { ReportFiltersSelectedCompositeFilterApi } from './report-filters-selected-composite-filter.api';
import { ReportFiltersSelectedCompositeFilterService } from './report-filters-selected-composite-filter.service';

@DynamicComponentLookup('ReportFiltersSelectedCompositeFilterComponent')
@Component({
    selector: 'app-report-filters-selected-composite-filter',
    templateUrl: './report-filters-selected-composite-filter.component.html',
    providers: [ReportFiltersSelectedCompositeFilterService, ReportFiltersSelectedCompositeFilterApi],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFiltersSelectedCompositeFilterComponent extends BaseFind3Component<ExtendedValuesType> implements OnInit, AfterViewInit {
    @Input() formName: ReportFilterFilterEnum;

    public parentIdKey = 'offer_id';

    public parentTitleKey = 'offer_name';

    @ViewChild(SelectComponent) selectComponent: SelectComponent;

    params$: BehaviorSubject<BaseFindRequestModel> = new BehaviorSubject<BaseFindRequestModel>({
        search: '',
        // status: PlatformListsStatusesNameEnum.Active,
        page: 1,
        perPage: 10,
        sortDirection: 'asc'
    });

    constructor(
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        private service: ReportFiltersSelectedCompositeFilterService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        if (this.formName === ReportFilterFilterEnum.AffiliateSource) {
            this.setAffiliatesParentKeys();
        }
        this.items$ = this.fetch();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    fetch(): Observable<ExtendedValuesType[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.service.fetch(filters, this.formName)),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items: any) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((filter) =>
                    this.service.fetch(filter, this.formName).pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => this.unique(acc, items, 'id')),
            this.removeEmptyValueFromControl(),
            tap(() => {
                this.endFetch();
            })
        ) as Observable<ExtendedValuesType[]>;
    }

    private setAffiliatesParentKeys(): void {
        this.parentIdKey = 'affiliate_id';
        this.parentTitleKey = 'affiliate_name';
    }

    selectedFull(event: any): void {
        this.toggleFull.emit(event);
    }

    initialSelectedHandler(event: any): void {
        this.initialSelected.emit(event);
    }

    // TODO move to abstract class
    public customSearchFn(term: string, item: ExtendedValuesType): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }
}
