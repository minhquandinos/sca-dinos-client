import { AfterViewInit, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of, shareReplay } from 'rxjs';
import { debounceTime, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import { ShortEntityListService, ShortEntityNameEnum, ShortPaymentMethodModel } from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';

@Component({
    selector: 'app-find-payment-methods',
    templateUrl: './find-payment-methods.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindPaymentMethodsComponent extends BaseFind3Component<ShortPaymentMethodModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue: any = null;

    constructor(
        protected readonly parentF: FormGroupDirective,
        protected readonly translate: TranslateService,
        private readonly shortEntityListService: ShortEntityListService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.fetch();
        // this.removeEmptyValueFromControl2();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    fetch(): Observable<ShortPaymentMethodModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            switchMap((queryParams) => this.shortEntityListService.list(ShortEntityNameEnum.PaymentMethods, { queryParams })),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((queryParams) =>
                    this.shortEntityListService.list(ShortEntityNameEnum.PaymentMethods, { queryParams }).pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => this.unique<ShortResponseInterface>(acc, items, 'id')),
            map((list: any[]) => {
                if (this.firstElement) {
                    return [this.firstElement, ...list];
                }

                return list as ShortResponseInterface[];
            }),
            this.removeEmptyValueFromControl(),
            tap(() => {
                this.endFetch();
            }),
            shareReplay()
        ) as Observable<ShortPaymentMethodModel[]>;
    }

    customSearchFn(term: string, item: ShortResponseInterface): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }
}
