import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    SimpleChanges,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, share, take, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { MultiSelectItemTemplateDirective } from './directives/multi-select-item-template.directive';
import { MultiSelectDataConfigModel } from './models/multi-select-data-config.model';
import { MultiSelectDynamicService } from './services/multi-select-dynamic.service';
import { MultiSelectFilteringService } from './services/multi-select-filtering.service';
import { MultiSelectSearchService } from './services/multi-select-search.service';
import { MultiSelectSelectedService } from './services/multi-select-selected.service';
import { MultiSelectBlockFacade } from './state/multi-select-block.facade';
import { MultiSelectBlock2Query, MultiSelectBlock2Store } from './state/multi-select-block.state';
import { MultiSelectStoreItemsType } from './types/multi-select-store-items.type';

@Component({
    selector: 'app-multi-select-block',
    templateUrl: './multi-select-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    providers: [
        UnsubscribeService,
        MultiSelectDynamicService,
        MultiSelectFilteringService,
        MultiSelectBlockFacade,
        MultiSelectSearchService,
        MultiSelectSelectedService,
        MultiSelectBlock2Store,
        MultiSelectBlock2Query
    ],
    encapsulation: ViewEncapsulation.None
})
export class MultiSelectBlockComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @HostBinding('class') hostClass = 'multi-select-block';

    @Input() title: string;

    @Input() formName: string;

    @Input() itemValue = 'id';

    @Input() itemLabel = 'title';

    @Input() format = 'title';

    @Input() set exclude(value: unknown[]) {
        this.filteringService.exclude = value;
    }

    @Input() autoFetchData = true;

    @Input() textOnStart: string;

    @Input() type: 'allowed' | 'denied' = 'allowed';

    @Input() set data(value: MultiSelectDataConfigModel) {
        this.dynamicDataService.config(value);
    }

    @Input() initSelectedItems: any[] = [];

    @Input() height = '470px';

    @ViewChild('itemsContainer', { static: true })
    readonly itemsContainer: ElementRef;

    @ContentChild(MultiSelectItemTemplateDirective, { static: true })
    readonly customItemTemplate: MultiSelectItemTemplateDirective;

    readonly selected$ = this.multiSelectBlockFacade.query.select('selected');

    readonly tempSelected$ = this.multiSelectBlockFacade.query.select(['tempSelected', 'items', 'selected']).pipe(
        map(({ tempSelected, items, selected }) => {
            const newItems = new Set([
                ...tempSelected,
                ...selected.filter((elem) => items.some((elem2) => elem2[this.itemValue] === elem[this.itemValue]))
            ]);
            return [...newItems];
        })
    );

    count$ = this.selected$.pipe(map((items) => items?.length));

    items$: Observable<MultiSelectStoreItemsType[]> = this.multiSelectBlockFacade.query.select().pipe(
        distinctUntilChanged(),
        debounceTime(100),
        map(({ items, selected, exclude }) => {
            let newItems = items;
            if (selected.length > 0) {
                newItems = newItems.filter((elem) => selected.every((elem2) => elem[this.itemValue] !== elem2[this.itemValue]));
            }

            if (exclude?.length > 0) {
                newItems = newItems.filter((elem) => exclude.every((elem2) => elem[this.itemValue] !== elem2));
            }

            return newItems;
        }),
        share()
    );

    loading$: Observable<boolean> = this.multiSelectBlockFacade.query.selectLoading();

    notFound$: Observable<boolean> = this.multiSelectBlockFacade.query.notFound$;

    notSearching$: Observable<boolean> = this.multiSelectBlockFacade.query.select('searching').pipe(map((searching) => !searching));

    fetchData$ = this.dynamicDataService.fetchData$;

    typeBackground: string;

    typeColorTextClass: string;

    typeControlIcon: string;

    constructor(
        private readonly unsubscribe: UnsubscribeService,
        @Optional() private readonly parentForm: FormGroupDirective,
        private readonly dynamicDataService: MultiSelectDynamicService,
        private multiSelectBlockFacade: MultiSelectBlockFacade,
        private filteringService: MultiSelectFilteringService,
        private searchService: MultiSelectSearchService,
        private selectedService: MultiSelectSelectedService
    ) {}

    ngOnInit(): void {
        this.setType();
        this.setFetchData();
        this.initData();
        this.loadData();

        this.filteringService.nextPageOnChangeItems().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        this.dynamicDataService.loadOnScroll(this.itemsContainer.nativeElement).pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { autoFetchData } = changes;

        if (autoFetchData?.currentValue || autoFetchData?.currentValue === false) {
            this.dynamicDataService.reload(autoFetchData?.currentValue);
        }
    }

    ngOnDestroy() {
        this.multiSelectBlockFacade.destroy();
    }

    search(search: string) {
        this.searchService.search(search);
        if (!this.dynamicDataService.fetchData) {
            this.dynamicDataService.fetchData = true;
            this.filteringService.reload();
        }
    }

    select(item: any) {
        this.selectedService.select(item);
        this.updateFormControl();
    }

    deselect(item: any) {
        this.selectedService.deselect(item, this.itemValue);
        this.updateFormControl();
    }

    removeAll() {
        this.selectedService.removeAll();
        this.updateFormControl();
    }

    updateFormControl(): void {
        if (this.parentForm) {
            this.parentForm.form
                .get(this.formName)
                .patchValue(this.multiSelectBlockFacade.value.selected.map((elem) => elem[this.itemValue]));
        }
    }

    trackByFn(item: any, index: number): number | string {
        return item[this.itemValue] || index;
    }

    private nextPage(): void {
        this.filteringService.nextPage();
    }

    private loadData(): void {
        this.dynamicDataService.loadDynamicData().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private setFetchData(): void {
        if (!this.autoFetchData) {
            this.dynamicDataService.fetchData = !this.autoFetchData ? this.parentForm.form.get(this.formName).value.length > 0 : true;
        }
    }

    private initData(): void {
        this.items$
            .pipe(
                filter((items) => items.length > 0 && this.dynamicDataService.fetchData),
                take(1),
                tap((items) => {
                    this.multiSelectBlockFacade.store.update({
                        selected: this.initSelectedItems ?? []
                    });

                    if (items?.length - this.initSelectedItems?.length < this.filteringService.perPage) {
                        this.nextPage();
                    }
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    // TODO refactor work with color
    private setType(): void {
        const bgMarkerMap = {
            allowed: 'green3',
            denied: 'red5'
        };

        const colorMarkerMap = {
            allowed: 'color__green',
            denied: 'color__red2'
        };

        const iconColorMap = {
            allowed: '#27AE60',
            denied: '#e24c54'
        };

        this.typeBackground = bgMarkerMap[this.type];
        this.typeColorTextClass = colorMarkerMap[this.type];
        this.typeControlIcon = iconColorMap[this.type];
    }
}
