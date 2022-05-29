import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, pluck, startWith, take, takeUntil, tap, throttleTime } from 'rxjs/operators';

import { PageContentService } from '@scaleo/core/page-content/service';
import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import {
    RowSizeType,
    SelectRowModel,
    UiTable2ColumnDirectionType,
    UiTable2ColumnsModel,
    UiTable2CustomColumnTemplate,
    UiTable2CustomColumnTranslate,
    UiTable2SortModel
} from '.';
import { UiTable2ColSelectDirective } from './directives/ui-table2-col-select.directive';
import { UiTable2ColTemplateDirective } from './directives/ui-table2-col-template.directive';
import { UiTable2HeaderColTooltipTemplateDirective } from './directives/ui-table2-header-col-tooltip-template.directive';
import { UiTable2ColumnSelectService } from './services/ui-table2-column-select.service';
import { UiTable2ColumnSortService } from './services/ui-table2-column-sort.service';
import { UiTable2ColumnTranslateService } from './services/ui-table2-column-translate.service';
import { UiTable2ParentContainerService } from './services/ui-table2-parent-container.service';
import { UiTable2ScrollService } from './services/ui-table2-scroll.service';
import { UiTable2TooltipService } from './services/ui-table2-tooltip.service';

@Component({
    selector: 'ui-table2',
    templateUrl: './ui-table2.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        UnsubscribeService,
        UiTable2ColumnSortService,
        UiTable2ColumnSelectService,
        UiTable2ScrollService,
        UiTable2ColumnTranslateService,
        UiTable2ParentContainerService,
        UiTable2TooltipService,
        ResizeObserverService
    ]
})
export class UiTable2Component implements OnDestroy, AfterViewInit, AfterContentInit, OnInit, OnChanges {
    @Input() columns: UiTable2ColumnsModel[] = [];

    @Input() set columnsTranslate(value: UiTable2CustomColumnTranslate) {
        if (value) {
            this.columnTranslateService.setCustomTranslate(value);
        }
    }

    @Input() stickyHead: boolean;

    @Input() parentContainer = '.page-content';

    @Input() sort: boolean;

    @Input() defaultSortDirection: UiTable2ColumnDirectionType;

    @Input() set defaultSortField(field: string) {
        if (field) {
            this.initDefaultSort(field);
            this._defaultSortField = field;
        }
    }

    @Input() showSelect: boolean;

    @Input() singleSelect: boolean;

    @Input() selectItemValue: string;

    @Input() asyncBuildData: boolean;

    @Input() customHorizontalScroll = false;

    @Input() set items(items: any[]) {
        if (items.length > 0) {
            // this.startUpdated();
            if (this.asyncBuildData) {
                this.buildData(items);
            } else {
                this._items = items;
            }

            this.itemsLength = items.length;
        }

        if (items.length === 0) {
            if (this.asyncBuildData && !this.loading) {
                this.itemsContainer.clear();
            } else {
                this._items = [];
            }
            this.itemsLength = 0;
        }
    }

    @Input() rowTemplate: TemplateRef<any>;

    @Input() controlTemplate: TemplateRef<any>;

    @Input() skeletonTemplate: TemplateRef<any>;

    @Input() loading: boolean;

    @Input() rowSize: RowSizeType = 'small';

    // @Input() updatedHandler = false;

    @Output() sorting: EventEmitter<UiTable2SortModel> = new EventEmitter<UiTable2SortModel>();

    @Output() selectAll: EventEmitter<SelectRowModel<any>[]> = new EventEmitter<SelectRowModel<any>[]>();

    @Output() selectLast: EventEmitter<SelectRowModel> = new EventEmitter<SelectRowModel>();

    private _defaultSortField: string = null;

    @ContentChildren(UiTable2ColTemplateDirective) columnTemplates: QueryList<UiTable2ColTemplateDirective>;

    @ContentChildren(UiTable2HeaderColTooltipTemplateDirective)
    headerColumnTooltipTemplate: QueryList<UiTable2HeaderColTooltipTemplateDirective>;

    columnTemplatesMap: UiTable2CustomColumnTemplate = {};

    @ViewChild('theadRef', { static: true })
    theadRef: ElementRef;

    @ViewChild('tfootRef', { static: true })
    tfootRef: ElementRef;

    @ViewChild('tableRef', { static: true })
    tableRef: ElementRef;

    itemsLength = 0;

    preloadingItems: boolean;

    _items: any[] = [];

    private _updated$: Subject<boolean> = new Subject<boolean>();

    updated$ = this._updated$.asObservable();

    @ViewChildren(UiTable2ColSelectDirective)
    private set _selectDirective(queryList: QueryList<UiTable2ColSelectDirective>) {
        this.selectDirective = queryList;
        Promise.resolve().then(() => {
            this.selectDirective.notifyOnChanges();
        });
    }

    selectDirective: QueryList<UiTable2ColSelectDirective>;

    @ViewChild('itemsContainer', { read: ViewContainerRef }) itemsContainer: ViewContainerRef;

    @ViewChild('itemTpl', { read: TemplateRef }) itemTpl: TemplateRef<any>;

    constructor(
        private columnSort: UiTable2ColumnSortService,
        private pageContentService: PageContentService,
        private scrollService: UiTable2ScrollService,
        private columnSelectService: UiTable2ColumnSelectService,
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private tooltipService: UiTable2TooltipService,
        private columnTranslateService: UiTable2ColumnTranslateService,
        @Inject(DOCUMENT) private document: Document,
        private parentContainerService: UiTable2ParentContainerService,
        private unsubscribe: UnsubscribeService,
        private translate: TranslateService,
        private readonly resizeObserverService: ResizeObserverService
    ) {}

    ngOnInit(): void {
        this.updateScrollWidthAfterLanguageChanged();
    }

    ngAfterViewInit(): void {
        this.initSort();
        this.initSelect();
        this.initCustomScroll();
        // this.initUpdated();
        this.tooltipService.setTooltipTemplates(this.headerColumnTooltipTemplate);
    }

    ngOnChanges(changes: SimpleChanges) {
        const { items } = changes;

        if (items?.currentValue) {
            this.updateScrollWidth();
            this.cdr.detectChanges();
        }
    }

    ngAfterContentInit(): void {
        this.setColumnTemplatesMap();
    }

    ngOnDestroy(): void {
        if (this.customHorizontalScroll) {
            this.renderer.removeClass(this.pageContentService.nativeElement, 'overflow-x-hidden');
        }
        this.clearSelected();
    }

    setColumnTemplatesMap(): void {
        this.columnTemplates.changes
            .pipe(startWith(this.columnTemplates), takeUntil(this.unsubscribe))
            .subscribe((templates: QueryList<UiTable2ColTemplateDirective>) => {
                templates.forEach((comp) => {
                    this.columnTemplatesMap[comp.uiTable2ColTemplate] = {
                        tpl: comp?.tpl,
                        className: comp?.className,
                        innerClassName: comp?.innerClassName
                    };
                });
            });
    }

    private buildData(items: any[]): void {
        if (this.asyncBuildData) {
            this.preloadingItems = true;
            const itemsRenderedAtOnce = 10;
            const ms = 1000;

            let currentIndex = 0;

            if (this.itemsContainer) {
                this.itemsContainer.clear();
            }

            const buildDataInterval = setInterval(() => {
                const nextIndex = currentIndex + itemsRenderedAtOnce;

                for (let n = currentIndex; n <= nextIndex; n++) {
                    if (n >= items.length) {
                        clearInterval(buildDataInterval);
                        this.preloadingItems = false;
                        this.updateScrollWidth();
                        break;
                    }
                    const context = {
                        item: items[n],
                        index: n
                    };
                    this.itemsContainer.createEmbeddedView(this.itemTpl, context).markForCheck();
                }

                currentIndex += itemsRenderedAtOnce;
            }, ms);
        }
    }

    private initSort(): void {
        this.columnSort.setDisplaySort(!!this.sort);
        if (this.sort) {
            this.columnSort.sort$.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe)).subscribe((sort) => {
                if (sort?.previous?.field) {
                    this.sorting.next(sort);
                }
            });
        }
    }

    private initDefaultSort(field: string): void {
        if (this.sort) {
            this.columnSort.initColumnSort({
                field,
                direction: this.defaultSortDirection
            });
        }
    }

    initSelect(): void {
        if (this.showSelect) {
            this.columnSelectService.setShowSelect(this.showSelect);

            combineLatest([this.selectDirective.changes, this.columnSelectService.selectedAll$])
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(([v, all]) => {
                    if (all) {
                        v.forEach((row: any) => {
                            row.host.select(true);
                        });
                    }
                });

            this.columnSelectService.selected$.pipe(takeUntil(this.unsubscribe)).subscribe((v) => {
                if (v) {
                    this.selectAll.emit(v);
                    const selectedLast = v.slice(-1)[0];
                    this.selectLast.emit(selectedLast);
                }
            });
        }

        if (this.singleSelect) {
            this.columnSelectService.setShowSelect(this.singleSelect);
        }
    }

    clearSelected(): void {
        this.columnSelectService.clearSelected();
    }

    updateScrollWidth(): void {
        if (this.customHorizontalScroll) {
            const subject$: Subject<void> = new Subject();

            this.resizeObserverService
                .observe(this.tableRef.nativeElement)
                .pipe(throttleTime(300), takeUntil(this.unsubscribe))
                .subscribe((node) => {
                    if (node?.width) {
                        this.scrollService.setScrollWidth(node?.width);
                    }
                    // this.renderer.setStyle(this.scrollElement.nativeElement, 'width', `${v?.width}px`);
                });

            // subject$
            //     .pipe(
            //         startWith(this.tableRef.nativeElement.scrollWidth as number),
            //         switchMap(() => of(this.tableRef.nativeElement.scrollWidth)),
            //         debounceTime(300),
            //         distinctUntilChanged(),
            //         tap((newValue) => {
            //             this.scrollService.setScrollWidth(newValue);
            //             subject$.next();
            //         }),
            //         takeUntil(this.unsubscribe)
            //     )
            //     .subscribe();
        }
    }

    private initCustomScroll(): void {
        if (this.customHorizontalScroll) {
            this.scrollService.setEnabled();
            this.scrollService.setTableContainer(this.tableRef);
            this.setParentContainer();
            this.pageContentService.element$
                .pipe(
                    pluck('nativeElement'),
                    filter((nativeElement) => nativeElement),
                    tap((nativeElement) => {
                        this.renderer.addClass(nativeElement, 'overflow-x-hidden');
                    }),
                    take(1),
                    takeUntil(this.unsubscribe)
                )
                .subscribe();
        }
    }

    // TODO complete this, after, move logic for service
    // private startUpdated() {
    //     if (!this.loading && !this.updatedHandler) {
    //         this._updated$.next(true);
    //     }
    // }

    // endUpdated() {
    //     console.log('end');
    //     if (!this.loading) {
    //         this._updated$.next(false);
    //     }
    // }
    //
    // startUpdatedHandler() {
    //     if (!this.loading) {
    //         this._updated$.next(true);
    //     }
    // }
    //
    // initUpdated(): void {
    //     if (!this.updatedHandler) {
    //         this._updated$
    //             .pipe(
    //                 filter((status) => status),
    //                 delay(1500),
    //                 takeUntil(this.unsubscribe)
    //             )
    //             .subscribe((status) => {
    //                 this._updated$.next(!status);
    //             });
    //     }
    // }

    trackByRowsFn(index: number, item: any): number {
        return item.id || index;
    }

    trackByColumnsFn(index: number): number {
        return index;
    }

    private setParentContainer(): void {
        if (this.parentContainer) {
            const container = this.document.querySelector(this.parentContainer);
            this.parentContainerService.setParentContainer(container);
        }
    }

    private updateScrollWidthAfterLanguageChanged(): void {
        this.translate.onLangChange
            .pipe(
                takeUntil(this.unsubscribe),
                tap(() => {
                    if (this.scrollService.enabled) {
                        this.updateScrollWidth();
                    }
                })
            )
            .subscribe();
    }
}
