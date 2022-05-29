import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { SelectComponent } from '@scaleo/shared/components/select';

import { BaseReportFilterSelectClass } from '../classes/base-report-filter-select.class';
import { ReportFiltersSelectedDefaultSelectInterface } from './models/report-filters-selected-default-select.model';
import { ReportFiltersSelectedDefaultSelectValueType } from './models/report-filters-selected-default-select.type';
import { ReportFiltersSelectedDefaultSelectService } from './report-filters-selected-default-select.service';

@DynamicComponentLookup('ReportFiltersSelectedDefaultSelectComponent')
@Component({
    selector: 'app-report-filters-selected-default-select',
    templateUrl: './report-filters-selected-default-select.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    providers: [ReportFiltersSelectedDefaultSelectService]
})
export class ReportFiltersSelectedDefaultSelectComponent extends BaseReportFilterSelectClass implements OnInit, AfterViewInit {
    @Input() set formName(filter: ReportFilterFilterEnum) {
        if (filter) {
            this._formName = filter;
            this.filterConfig = this.service.getComponentForReportFiltersDefaultSelect(filter);
        }
    }

    @Output() toggleFull: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Output() initialSelected: EventEmitter<any> = new EventEmitter<any>();

    private filterConfig: ReportFiltersSelectedDefaultSelectInterface;

    public items: Observable<ReportFiltersSelectedDefaultSelectValueType[]>;

    @ViewChild(SelectComponent) selectComponent: SelectComponent;

    constructor(private platformListsService: PlatformListsService, private service: ReportFiltersSelectedDefaultSelectService) {
        super();
    }

    ngOnInit(): void {
        this.items = this.fetch();
    }

    ngAfterViewInit(): void {
        this.addedDynamicCompareWithFn();
    }

    private fetch() {
        const { platformListProperty } = this.filterConfig;

        return this.searchParams$.pipe(
            debounceTime(200),
            tap(() => {
                this.loading = true;
            }),
            switchMap((search = '') =>
                platformListProperty ? this.platformListsService.platformListsNew(platformListProperty) : this.filterConfig.request(search)
            ),
            map((items: ReportFiltersSelectedDefaultSelectValueType[]) => {
                if (platformListProperty) {
                    items = (items as any)[platformListProperty].map((item: any) => {
                        let id = (item?.id || item?.id === 0) && !Number.isNaN(+item.id) ? +item.id : null;
                        if (platformListProperty === ReportFilterFilterEnum.Currency) {
                            id = item.code;
                        }

                        return {
                            ...item,
                            id,
                            title: this.reformTitle(item.title)
                        };
                    });
                }
                return items;
            }),
            tap(() => {
                this.loading = false;
            })
        );
    }

    private reformTitle(title: string): string {
        return this.filterConfig.replaceUnderscore ? title.replace(/ /g, '_') : title;
    }

    public addedDynamicCompareWithFn() {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.selectComponent.compareWith = this.compareWithFn;
    }

    selectedFull(event: any) {
        this.toggleFull.emit(event);
    }

    initialSelectedHandler(event: any) {
        this.initialSelected.emit(event);
    }
}
