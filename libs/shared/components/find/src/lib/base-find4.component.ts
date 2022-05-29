import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, Observable, of, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, take, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { ArrayUtil } from '@scaleo/utils';

import { SelectChangeModel } from '../../../select/src/lib/models/select.model';
import { SelectComponent } from '../../../select/src/lib/select.component';
import { compareWithFnUtil } from '../../../select/src/lib/util/select.util';
import { FIND_TOKEN } from './find.token';
import { BaseFindInterface } from './interfaces/base-find.interface';

@Component({
    template: ''
})
export abstract class BaseFind4Component<T> implements OnInit, AfterViewInit {
    @Input() formName: string = null;

    @Input() formNameArray: string = null;

    @Input() label = '';

    @Input() clearable = false;

    @Input() disabled = false;

    @Input() hideSelected = true;

    @Input() itemLabel: string = null;

    @Input() itemValue: string = null;

    @Input() multiple = false;

    @Input() hideDropdownArrow: boolean;

    @Input() set placeholder(placeholder: string) {
        if (placeholder) {
            this.placeholder$ = of(placeholder);
        }
    }

    @Output() toggleFull: EventEmitter<T[]> = new EventEmitter<T[]>();

    @Output() initialSelected: EventEmitter<T[]> = new EventEmitter<T[]>();

    @Output() toggle: EventEmitter<SelectChangeModel> = new EventEmitter<SelectChangeModel>();

    @Output() clear: EventEmitter<void> = new EventEmitter<void>();

    @Input() disableSelect: boolean;

    @Input() searchable: boolean;

    @Input() labelShowId = true;

    @Input() index: number;

    @ViewChild(SelectComponent) selectComponent: SelectComponent;

    loading: boolean;

    firstLoad = true;

    items$: Observable<T[]>;

    pagination: ApiPaginationModel;

    savedLastPage: number;

    placeholder$: Observable<string>;

    params$: BehaviorSubject<BaseObjectModel> = new BehaviorSubject<BaseObjectModel>({
        perPage: 20,
        page: 1,
        search: '',
        sortDirection: 'asc',
        exact: ''
    });

    protected setNewItems = false;

    private emptyElements$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    protected constructor(
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        @Inject(FIND_TOKEN) protected service: BaseFindInterface<T>
    ) {}

    ngOnInit(): void {
        this.placeholder$ = this.translate.stream('interface.basic.search');
    }

    ngAfterViewInit(): void {
        this.addedDynamicCompareWithFn();
    }

    // abstract fetch(): Observable<T[]>;

    initialSelectedHandler(event: T[]): void {
        this.initialSelected.emit(event);
    }

    selectedFull(select: T[]): void {
        this.toggleFull.emit(select as any);
    }

    protected getEmptyElements<F>(elements: T[], formName: string): F[] {
        const filters = [];
        if (this.firstLoad) {
            const emptyElements = this.findEmptyElements(elements, formName);
            if (emptyElements.length > 0) {
                emptyElements.forEach((id) => {
                    const filter = { ...this.params$.getValue() };
                    filter.exact = 'id';
                    filter.search = String(id);
                    filters.push(filter);
                });
                this.emptyElements$.next(emptyElements.map((elem) => elem));
            }
        }

        return filters;
    }

    protected findEmptyElements(elements: T[], formName: string): any[] {
        let formValue;

        if (this.parentF) {
            if (this.formNameArray) {
                formValue = this.parentF.form.get(this.formNameArray)?.value[this.index]?.[this.formName];
            } else {
                formValue = this.parentF.form.get(formName)?.value;
            }
        }

        if (formValue) {
            if (this.multiple) {
                return this.getEmptyMultipleElements(elements, formValue);
            }

            return this.getEmptySingleElement(elements, formValue);
        }
        return [];
    }

    // protected checkCurrentElement(items: T[], formName: string) {
    //     if (formName && items?.length > 0) {
    //         const item = this.parentF.form.get(formName)?.value;
    //         const id = item && typeof item === 'object' ? item.id : item;
    //         if (id) {
    //             const haveCurrentElement = items.find((elem: any) => elem.id === id);
    //             if (!haveCurrentElement) {
    //                 this.findElement(id);
    //             }
    //         }
    //     }
    // }

    findElement(search: string = ''): void {
        this.params$.next({
            ...this.params$.value,
            page: 1,
            search,
            exact: +search ? 'id' : null
        });
        this.resetItems();
    }

    private getEmptySingleElement(elements: T[], formValue: any): any[] {
        const ids = [];
        const id = +formValue ? formValue : formValue.id;
        const haveCurrentOffer = elements.find((element: any) => +element.id === +id);
        if (!haveCurrentOffer) {
            ids.push(formValue);
        }
        return ids;
    }

    private getEmptyMultipleElements(elements: T[], formValues: any[]): any[] {
        const ids = [];
        if (formValues.length > 0) {
            formValues?.forEach((item) => {
                const id = +item ? item : item.id;
                const haveCurrentOffer = elements.find((element: any) => +element.id === +id);
                if (!haveCurrentOffer) {
                    ids.push(item);
                }
            });
        }

        return ids;
    }

    addedDynamicCompareWithFn(): void {
        if (this.multiple && this.itemValue) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.selectComponent.compareWith = this.compareWithFn;
        }
    }

    private compareWithFn(item, selected): boolean {
        return compareWithFnUtil(item, selected, this.itemValue);
    }

    public selected(select: SelectChangeModel): void {
        this.toggle.emit(select);
        if (this.params$.value.search !== '') {
            this.clearParams();
        }
    }

    public scrolledToEnd(): void {
        const params = this.params$.value;
        this.savedLastPage = (this.savedLastPage || params.page) + 1;
        if (this.pagination && this.savedLastPage <= this.pagination.page_count) {
            this.params$.next({
                ...params,
                page: this.savedLastPage
            });
        }
    }

    private clearParams(): void {
        const params = this.params$.value;
        this.params$.next({
            ...params,
            search: null,
            exact: null,
            page: 1
        });
        this.resetItems();
    }

    cleared(): void {
        this.clear.emit();
    }

    startFetch(): void {
        this.loading = true;
    }

    endFetch(): void {
        this.loading = false;
        this.firstLoad = false;
        this.setNewItems = false;
    }

    private resetItems(): void {
        this.setNewItems = true;
    }

    unique<U>(acc: U[], items: U[], key: keyof U): U[] {
        return this.setNewItems ? items : ArrayUtil.unique(acc, items, key);
    }

    protected removeEmptyValueFromControl2(): void {
        if (this.parentF) {
            const value = this.parentF.form.get(this.formName)?.value;
            zip([this.items$, this.emptyElements$])
                .pipe(take(1))
                .subscribe(([items, emptyElements]) => {
                    if (emptyElements && this.itemValue) {
                        const removedFromControl = (emptyElements as unknown[]).filter(
                            (elem) => !items.some((item) => elem === item[this.itemValue])
                        );
                        if (removedFromControl) {
                            if (this.multiple) {
                                const newValue = value.filter((elem) => !removedFromControl.includes(elem));
                                this.parentF.form.get(this.formName).patchValue(newValue.length > 0 ? newValue : '');
                            }

                            if (!this.multiple && !items.some((item) => item[this.itemValue] === value)) {
                                this.parentF.form.get(this.formName).reset();
                            }
                        }
                    }
                });
        }
    }

    fetch(): Observable<T[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
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
            scan((acc, items) => this.unique(acc, items, 'id')),
            tap(() => {
                this.endFetch();
            })
        );
    }
}
