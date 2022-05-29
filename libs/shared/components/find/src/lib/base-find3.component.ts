import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, EMPTY, Observable, OperatorFunction, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BaseControlValueAccessor } from '@scaleo/core/classes';
import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { compareWithFnUtil, SelectChangeModel, SelectComponent, SelectThemeType } from '@scaleo/shared/components/select';
import { ArrayUtil } from '@scaleo/utils';

import { BaseFindRequestModel } from './models/base-find.model';

@Component({
    template: ''
})
export abstract class BaseFind3Component<T> extends BaseControlValueAccessor<any> implements AfterViewInit, OnChanges {
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
        if (placeholder || placeholder === null || placeholder === '') {
            this._placeholder$.next(placeholder);
        }
    }

    @Output() toggleFull: EventEmitter<T | T[]> = new EventEmitter<T | T[]>();

    @Output() initialSelected: EventEmitter<T | T[]> = new EventEmitter<T | T[]>();

    @Output() toggle: EventEmitter<SelectChangeModel> = new EventEmitter<SelectChangeModel>();

    @Output() clear: EventEmitter<void> = new EventEmitter<void>();

    @Input() disableSelect: boolean;

    @Input() searchable: boolean;

    @Input() labelShowId = true;

    @Input() onlyIds: number[] | unknown[] = [];

    @Input() exceptIds: number[] | unknown[] = [];

    @Input() itemIncrement = 'id';

    @Input() index: number;

    @Input() firstElement: unknown;

    @Input() theme: SelectThemeType;

    @Input() appendTo: 'body';

    @ViewChild(SelectComponent) selectComponent: SelectComponent;

    loading: boolean;

    firstLoad = true;

    items$: Observable<T[]>;

    pagination: ApiPaginationModel;

    savedLastPage: number;

    private _placeholder$: BehaviorSubject<string> = new BehaviorSubject<string>('interface.basic.search');

    readonly placeholder$ = this._placeholder$.asObservable().pipe(switchMap((key) => (key ? this.translate.stream(key) : EMPTY)));

    params$: BehaviorSubject<BaseFindRequestModel | any> = new BehaviorSubject<BaseFindRequestModel | any>({
        perPage: 20,
        page: 1,
        search: '',
        sortDirection: 'asc',
        exact: ''
    });

    protected setNewItems = false;

    private _emptyElements$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    protected updateStream$: Subject<void> = new Subject();

    protected constructor(protected parentF: FormGroupDirective, protected translate: TranslateService) {
        super();
    }

    private _selectedFull$: BehaviorSubject<unknown | unknown[]> = new BehaviorSubject<unknown | unknown[]>(undefined);

    readonly selectedFull$ = this._selectedFull$.asObservable();

    private static _diffChangeParam(elem: SimpleChange): boolean {
        if (elem) {
            return elem?.currentValue?.join() !== elem?.previousValue?.join();
        }
        return false;
    }

    ngAfterViewInit(): void {
        this.addedDynamicCompareWithFn();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._detectChangesParams(changes);
    }

    abstract fetch(): Observable<T[]>;

    initialSelectedHandler(event: T | T[]): void {
        this.initialSelected.emit(event);
        this._selectedFull$.next(event as any);
    }

    selectedFull(select: T | T[]): void {
        this.toggleFull.emit(select);
        this._selectedFull$.next(select);
    }

    protected getEmptyElements<F>(elements: T[], formName: string): F[] {
        const filters: any[] = [];
        if (this.firstLoad) {
            const emptyElements = this.findEmptyElements(elements, formName);
            if (emptyElements.length > 0) {
                emptyElements.forEach((id) => {
                    const flt: BaseObjectModel = { ...this.params$.getValue() };
                    flt.exact = 'id';
                    flt.search = String(id);
                    filters.push(flt);
                });
                this._emptyElements$.next(emptyElements.map((elem) => elem));
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
                return this._getEmptyMultipleElements(elements, formValue);
            }

            return this._getEmptySingleElement(elements, formValue);
        }
        return [];
    }

    protected checkCurrentElement(items: T[], formName: string): void {
        if (formName && items?.length > 0) {
            const item = this.parentF.form.get(formName)?.value;
            const id = item && typeof item === 'object' ? item.id : item;
            if (id) {
                const haveCurrentElement = items.find((elem: any) => elem.id === id);
                if (!haveCurrentElement) {
                    this.findElement(id);
                }
            }
        }
    }

    findElement(search: string = ''): void {
        this.params$.next({
            ...this.params$.value,
            page: 1,
            search,
            exact: +search ? 'id' : null
        });
        this._resetItems();
    }

    private _getEmptySingleElement(elements: T[], formValue: any): any[] {
        return this._getEmptyIds(elements, formValue);
    }

    private _getEmptyMultipleElements(elements: T[], formValues: any[]): any[] {
        const ids: any[] = [];
        if (formValues.length > 0) {
            formValues?.forEach((item) => {
                const id = this._getEmptyIds(elements, item);
                if (id.length) {
                    ids.push(id);
                }
            });
        }
        return ids;
    }

    private _getEmptyIds(elements: T[], item: any): any[] {
        const ids: any[] = [];
        const itemValue = this.itemValue !== null ? item : JSON.stringify(item);
        const haveCurrentEntity = elements.find((element: any) => {
            if (this.itemValue) {
                if (!Number.isNaN(+itemValue) && typeof +itemValue === 'number') {
                    return +element?.[this.itemValue] === +itemValue;
                } else {
                    return element?.[this.itemValue] === itemValue;
                }
            }
            return JSON.stringify(element) === itemValue;
        });

        if (!haveCurrentEntity) {
            ids.push(item);
        }

        return ids;
    }

    addedDynamicCompareWithFn(): void {
        if (this.multiple && this.itemValue) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.selectComponent.compareWith = this._compareWithFn;
        }
    }

    private _compareWithFn(item: any, selected: any): boolean {
        return compareWithFnUtil(item, selected, this.itemValue);
    }

    public selected(select: SelectChangeModel): void {
        this.toggle.emit(select);
        if (this.params$.value.search !== '') {
            this._clearParams();
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

    private _clearParams(): void {
        const params = this.params$.value;
        this.params$.next({
            ...params,
            search: null,
            exact: null,
            page: 1
        });
        this._resetItems();
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

    private _resetItems(): void {
        this.setNewItems = true;
    }

    unique<U>(acc: U[], items: U[], key: keyof U): U[] {
        return this.setNewItems ? items : ArrayUtil.unique(acc, items, key);
    }

    // TODO fixed double api call and remove
    // protected removeEmptyValueFromControl2(): void {
    //     if (this.parentF) {
    //         const value = this.parentF.form.get(this.formName)?.value;
    //         zip([this.items$, this.emptyElements$])
    //             .pipe(
    //                 filter(([items]) => !!items.length),
    //                 take(1)
    //             )
    //             .subscribe(([items, emptyElements]) => {
    //                 if (emptyElements && this.itemValue) {
    //                     const removedFromControl = (emptyElements as unknown[]).filter(
    //                         (elem) => !items.some((item) => elem === (item as any)[this.itemValue])
    //                     );
    //                     if (removedFromControl) {
    //                         if (this.multiple) {
    //                             const newValue = (value || [])?.filter((elem: any) => !removedFromControl.includes(elem));
    //                             this.parentF.form.get(this.formName).patchValue(newValue.length > 0 ? newValue : '');
    //                         }
    //
    //                         if (!this.multiple && !items.some((item) => (item as any)[this.itemValue] === value)) {
    //                             this.parentF.form.get(this.formName)?.reset();
    //                         }
    //                     }
    //                 }
    //             });
    //     }
    // }

    filterItemsOperator() {
        return map((items: T[]) => {
            if (this.onlyIds?.length > 0) {
                return items.filter((item) => this.onlyIds.includes((item as any)[this.itemIncrement]));
            }

            if (this.exceptIds?.length > 0) {
                return items.filter((item) => !this.exceptIds.includes((item as any)[this.itemIncrement]));
            }

            return items;
        });
    }

    appendFirstElementOperator(): any {
        return map((list: T[]) => {
            if (this.firstElement) {
                return [this.firstElement, ...list];
            }

            return list;
        });
    }

    protected removeEmptyValueFromControl(): OperatorFunction<any, any> {
        return tap((items: T[]) => {
            if (items.length && this.parentF && this.firstLoad) {
                const value = this.parentF.form.get(this.formName)?.value;
                const emptyElements = this._emptyElements$.value;

                if (emptyElements && this.itemValue) {
                    const removedFromControl = emptyElements.filter(
                        (elem) => !items.some((item) => elem === (item as any)[this.itemValue])
                    );
                    if (removedFromControl) {
                        if (this.multiple) {
                            const newValue = (value || [])?.filter((elem: any) => !removedFromControl.includes(elem));
                            this.parentF.form.get(this.formName).patchValue(newValue.length > 0 ? newValue : '');
                        }

                        if (!this.multiple && !items.some((item) => (item as any)[this.itemValue] === value)) {
                            this.parentF.form.get(this.formName)?.reset();
                        }
                    }
                }
            }
        });
    }

    private _detectChangesParams(changes: SimpleChanges) {
        const { onlyIds, exceptIds } = changes;
        if (BaseFind3Component._diffChangeParam(onlyIds) || BaseFind3Component._diffChangeParam(exceptIds)) {
            this.updateStream$.next();
        }
    }
}
