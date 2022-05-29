import { AfterViewInit, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { debounceTime, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';

import { BaseFind3Component } from '../../base-find3.component';
import { BaseFindRequestModel } from '../../models/base-find.model';
import { FindCampaignsService } from './find-campaigns.service';

@Component({
    selector: 'app-find-campaigns',
    templateUrl: './find-campaigns.component.html',
    providers: [FindCampaignsService],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindCampaignsComponent extends BaseFind3Component<ShortResponseInterface> implements OnInit, AfterViewInit {
    public params$: BehaviorSubject<BaseFindRequestModel> = new BehaviorSubject<BaseFindRequestModel>({
        perPage: 20,
        page: 1,
        search: '',
        sortDirection: 'asc',
        sortField: 'id'
    });

    @Input() itemLabel = 'title';

    constructor(private service: FindCampaignsService, protected parentF: FormGroupDirective, protected translate: TranslateService) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.fetch();
        // this.removeEmptyValueFromControl2();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    fetch(): Observable<ShortResponseInterface[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            switchMap((filters) => this.service.index(filters)),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((filter) =>
                    this.service.index(filter).pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => this.unique<ShortResponseInterface>(acc, items, 'id')),
            this.removeEmptyValueFromControl(),
            tap(() => {
                this.endFetch();
            })
        );
    }

    customSearchFn(term: string, item: ShortResponseInterface): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }
}
