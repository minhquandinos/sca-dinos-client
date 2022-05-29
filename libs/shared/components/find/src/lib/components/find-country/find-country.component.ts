import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { GeoIpModel, GeoIpParamsModel, GeoIpService } from '@scaleo/shared/data-access';

import { BaseFind3Component } from '../../base-find3.component';

@DynamicComponentLookup('FindCountryComponent')
@Component({
    selector: 'app-find-country',
    templateUrl: './find-country.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FindCountryComponent extends BaseFind3Component<GeoIpModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    params$: BehaviorSubject<GeoIpParamsModel> = new BehaviorSubject<GeoIpParamsModel>({
        search: '',
        lang: this.translate.currentLang,
        page: 1,
        perPage: 20,
        country: '',
        region: ''
    });

    constructor(
        protected geoIpService: GeoIpService,
        protected translate: TranslateService,
        public controlContainer: ControlContainer,
        protected parentF: FormGroupDirective
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.fetch();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    fetch(): Observable<GeoIpModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.geoIpService.getCountries(filters as any)),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements<GeoIpParamsModel>(items.results, this.formName).map((filter) =>
                    this.geoIpService.getCountries(filter).pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => this.unique(acc, items, 'id')),
            tap(() => {
                this.endFetch();
            })
        );
    }

    customSearchFn(term: string, item: GeoIpModel): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term;
    }
}
