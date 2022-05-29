import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, from, Observable, of, Subject } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { ServiceLocator } from '@scaleo/core/locator/service';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { ActionWidgetComponent, ContainerWidgetComponent } from '@scaleo/dashboard/shared/components/container-widget';
import { FormatService } from '@scaleo/platform/format/service';
import { UiPageWrapperFooterBorderTopEnum } from '@scaleo/ui-kit/elements';

import { WidgetServiceInterface } from './interfaces/widget.interface';
import { DashboardWidgetModel } from './model/dashboard-config.model';

@Component({
    template: '',
    providers: [FormatService]
})
export abstract class BaseDashboardWidgetComponent implements OnInit, OnDestroy, AfterViewInit {
    @HostBinding('class') hostClass = 'd-block h-100';

    @Input() widget: DashboardWidgetModel;

    @ViewChild(ContainerWidgetComponent, { static: true }) containerWidget: ContainerWidgetComponent;

    private isEdit$: Observable<boolean> = this.dashboardConfigService.isEdit$;

    unsubscribe: Subject<void> = new Subject<void>();

    widget$: Observable<DashboardWidgetModel>;

    translateService: TranslateService;

    title$: Observable<string>;

    private widgetClassName: string;

    protected constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        protected widgetService: WidgetServiceInterface<any>
    ) {
        this.translateService = ServiceLocator.injector.get(TranslateService);
    }

    ngOnInit(): void {
        this.updatedWidget();
        this.initHostClass();

        this.widget$ = from([this.widget]);
        this.title$ = this.widgetTitle$();
    }

    ngAfterViewInit(): void {
        this.initWidgetContainerClass();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    createWidgetAction(): Observable<any> {
        return this.isEdit$.pipe(
            mergeMap((isEdit) => {
                this.containerWidget.widgetAction.clear();
                let containerRef: ComponentRef<any>;

                if (isEdit) {
                    // const factory = this.componentFactoryResolver.resolveComponentFactory(ActionWidgetComponent);
                    containerRef = this.containerWidget.widgetAction.createComponent(ActionWidgetComponent);
                    containerRef.instance.action = this.widget.multi && !this.widget.active ? false : this.widget.active;
                    return containerRef.instance.actionEvent;
                }
                return of(null);
            })
        );
    }

    createWidgetSettings(template: TemplateRef<any>, context: any = null): void {
        this.isEdit$.subscribe((type) => {
            this.containerWidget.widgetSettings.clear();
            if (type) {
                this.createEmbeddedView(this.containerWidget.widgetSettings, template, context);
            }
        });
    }

    createEmbeddedView(container: ViewContainerRef, template: TemplateRef<any>, context: any = null): void {
        container.createEmbeddedView(template, context);
    }

    updatedWidget(): void {
        this.dashboardWidgetService.updateWidget$.pipe(takeUntil(this.unsubscribe)).subscribe((widget) => {
            if (widget === this.widget.identifier && this.widgetService) {
                this.widgetService.widgetSubject$.next();
            }
        });
    }

    widgetTitle$(): Observable<string> {
        return this.widget$.pipe(
            switchMap((widget) => {
                if (widget) {
                    const { translateKey, identifier } = widget;
                    const key = translateKey || 'title';

                    return this.translateService.stream(`dashboard_grid.widget.${identifier}.${key}`);
                }
                return EMPTY;
            })
        );
    }

    private widgetSizeClass(): void {
        const widgetClassName = `custom-dashboard-widget-${this.widget.identifier}`;
        const widgetSizeClassName = ` ${widgetClassName}--size-${this.widget.gridConfig.rows}-rows`;
        this.hostClass += widgetSizeClassName;
    }

    private initHostClass(): void {
        this.widgetClassName = `custom-dashboard-widget-${this.widget.identifier}`;
        this.hostClass += ` ${this.widgetClassName}`;
        this.widgetSizeClass();
    }

    private initWidgetContainerClass(): void {
        this.containerWidget?.pageWrapperComponent.content.containerRef.nativeElement.classList.add(`${this.widgetClassName}__content`);

        this.containerWidget?.pageWrapperComponent.header.headerRef.nativeElement.classList.add(`${this.widgetClassName}__header`);

        this.containerWidget?.pageWrapperComponent.footer.footerRef.nativeElement.classList.add(`${this.widgetClassName}__footer`);
    }

    protected setContainerWidgetFooterBorderTop(border: UiPageWrapperFooterBorderTopEnum = UiPageWrapperFooterBorderTopEnum.Shadow): void {
        this.containerWidget.pageWrapperComponent.footer.initBorderTopStyle(border);
    }
}
