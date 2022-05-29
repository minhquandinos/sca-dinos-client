import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { ContainerWidgetComponent } from '@scaleo/dashboard/shared/components/container-widget';
import {
    MGCOM_WIDGET_TOP_PROVIDER,
    MgcomTopFacade,
    MgcomTopInterface,
    MgcomTopState,
    tableFirstColFactory,
    tableHeadersConfig
} from '@scaleo/dashboard/shared/widgets/mgcom-top/data-access';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { UiTableHeaderInterface, UiTableSortInterface } from '@scaleo/ui-kit/elements';

@DynamicComponentLookup(DASHBOARD_WIDGET.mgcomTop)
@Component({
    selector: 'app-mgcom-top',
    templateUrl: './mgcom-top.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MGCOM_WIDGET_TOP_PROVIDER]
})
export class MgcomTopComponent extends BaseDashboardWidgetComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('settingsTemplate') settingsTemplate: TemplateRef<any>;

    // @ViewChild(DropdownMenuComponent) set dropdownMenuComponent(component: DropdownMenuComponent) {
    //     if (component) {
    //         component.dropdownDirective?.open?.subscribe((status) => {
    //             if (status) {
    //                 this.dashboardConfigService.draggableResizableActivated(false);
    //             } else {
    //                 this.dashboardConfigService.draggableResizableActivated(true);
    //             }
    //         });
    //     }
    // }

    widgetData$: Observable<ApiResponseWithPagination<MgcomTopInterface[]>> = this.mgcomTopState._data$;

    activeTab$ = this.mgcomTopState._activeTab$;

    @ViewChild(ContainerWidgetComponent)
    private set containerWidgetComponent(component: ContainerWidgetComponent) {
        if (component) {
            this.renderer2.addClass(component.pageWrapperComponent.pageRef.nativeElement, 'mgcom-top-infinity-scroll');
        }
    }

    filterForm: FormGroup;

    tableHeaders: UiTableHeaderInterface[] = tableHeadersConfig();

    mgComTopEnum = BreakdownEnum;

    isLoad$ = this.mgcomTopState._isLoad$;

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        private cdr: ChangeDetectorRef,
        protected mgcomTopState: MgcomTopState,
        private mgcomTopFacade: MgcomTopFacade,
        private renderer2: Renderer2,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardToolbarService: DashboardToolbarService
    ) {
        super(dashboardConfigService, dashboardWidgetService, mgcomTopFacade);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initFilterForm();
        this.filterManagerTrigger();

        this.mgcomTopFacade.widgetData$.pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((action) => this.dashboardWidgetService.activeInactiveWidget(action, this.widget));
        if (this.widget.active) {
            // this.createWidgetSettings(this.settingsTemplate);
        }

        this.setContainerWidgetFooterBorderTop();

        this.cdr.detectChanges();
    }

    private initFilterForm() {
        this.filterForm = this.formBuilder.group({
            manager: [null]
        });
    }

    sort(event: UiTableSortInterface) {
        this.mgcomTopFacade.sorted(event);
    }

    filterManagerTrigger() {
        this.filterForm
            .get('manager')
            .valueChanges.pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => {
                if (value) {
                    this.mgcomTopFacade.filteredManager(value);
                }
            });
    }

    onScroll() {
        this.mgcomTopFacade.pagination();
    }

    switchTab(tab: BreakdownEnum) {
        if (tab === BreakdownEnum.AffiliateSubId1) {
            this.tableHeaders.splice(0, 1, tableFirstColFactory(BreakdownEnum.Affiliate));
            this.tableHeaders.splice(1, 0, tableFirstColFactory(tab));
        } else {
            this.tableHeaders.splice(0, 1, tableFirstColFactory(tab));
        }

        if (tab !== BreakdownEnum.AffiliateSubId1 && this.tableHeaders[1].value === BreakdownEnum.AffiliateSubId1) {
            this.tableHeaders.splice(1, 1);
        }

        this.tableHeaders = [...this.tableHeaders];

        this.mgcomTopFacade.switchTab(tab);
    }

    linkToReport() {
        const { rangeFrom, rangeTo, selectedRange } = this.dashboardToolbarService.dateRange$.getValue();
        this.activeTab$.pipe(takeUntil(this.unsubscribe)).subscribe((tab) => {
            switch (tab) {
                case BreakdownEnum.Affiliate:
                    this.router.navigate(['../../reports/statistics/affiliate'], {
                        relativeTo: this.activatedRoute,
                        queryParams: { rangeFrom, rangeTo, selectedRange }
                    });
                    break;
                case BreakdownEnum.AffiliateSubId1:
                    this.router.navigate(['../../reports/statistics/general'], {
                        relativeTo: this.activatedRoute,
                        queryParams: { breakdown: BreakdownEnum.AffiliateSubId1, rangeFrom, rangeTo, selectedRange }
                    });
                    break;
                default:
                    this.router.navigate(['../../reports/statistics/offer'], {
                        relativeTo: this.activatedRoute,
                        queryParams: { rangeFrom, rangeTo, selectedRange }
                    });
                    break;
            }
        });
    }

    get verticalSeparator(): Observable<string> {
        const baseClass = 'custom-dashboard-widget-mgcom_top-table';
        return this.activeTab$.pipe(
            map((tab) => {
                if (tab === BreakdownEnum.AffiliateSubId1) {
                    return `${baseClass}__vertical-separator-second-col`;
                }
                return `${baseClass}__vertical-separator-first-col`;
            })
        );
    }
}
