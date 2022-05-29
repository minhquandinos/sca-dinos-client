import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DashboardWidgetModel, DashboardWidgetUnionType } from '@scaleo/dashboard/common';

@Injectable()
export class DashboardWidgetService {
    widgets$: BehaviorSubject<DashboardWidgetModel[]> = new BehaviorSubject<DashboardWidgetModel[]>([]);

    tempActiveWidgets$: BehaviorSubject<DashboardWidgetModel[]> = new BehaviorSubject<DashboardWidgetModel[]>([]);

    updateWidget$: BehaviorSubject<DashboardWidgetUnionType> = new BehaviorSubject<DashboardWidgetUnionType>(null);

    constructor(
        private profileQuery: ProfileQuery,
        @Inject(DOCUMENT) private document: Document // @Inject(GRID_CONFIG_TOKEN) private readonly gridConfig: DashboardWidgetModel[]
    ) {}

    // getWidgets(): void {
    //     this.dashboardWidgetsConfigService.config;
    //     this.widgets$.next(this.gridConfig);
    // }

    get activeWidgets$(): Observable<DashboardWidgetModel[]> {
        return this.widgets$.pipe(map((widgets) => widgets.filter((widget) => widget.active)));
    }

    get inactiveWidgets$(): Observable<DashboardWidgetModel[]> {
        return this.widgets$.pipe(
            map((widgets) => {
                const allWidgets = widgets
                    .filter((widget) => !widget.active || widget.multi)
                    .map((widget) => ({
                        ...widget,
                        active: false
                    }));

                return [...new Set(allWidgets.map((item) => item.identifier))].map((identifier) =>
                    allWidgets.find((item) => item.identifier === identifier)
                );
            })
        );
    }

    setTempActiveWidgets(): void {
        const tempActiveWidgets = JSON.parse(JSON.stringify(this.widgets$.value));
        this.tempActiveWidgets$.next(tempActiveWidgets);
    }

    resetActiveWidgets(): void {
        this.widgets$.next(this.tempActiveWidgets$.value);
        this.tempActiveWidgets$.next([]);
    }

    activeInactiveWidget(action: boolean, widget: DashboardWidgetModel): void {
        if (action !== null) {
            if (action) {
                this.activatedWidget(widget);
            } else {
                this.inactivatedWidget(widget);
            }
        }
    }

    private activatedWidget(widget: DashboardWidgetModel): void {
        const currentWidgets = this.widgets$.value;
        let widgetId = widget.id;

        if (widget.multi && this.checkMultiWidget(widget)) {
            widgetId = this.generateWidgetId(widget);
            const newWidget = {
                ...widget,
                active: true,
                id: widgetId
            };
            this.widgets$.next([...currentWidgets, newWidget]);
        } else {
            this.changeWidgetStatus(widget, true);
        }

        setTimeout(() => {
            this.scrollTo(`#${widgetId}`);
        }, 100);
    }

    private inactivatedWidget(widget: DashboardWidgetModel): void {
        const currentWidgets = this.widgets$.value;
        const countWidget = this.countWidget(widget.identifier);
        if (widget.multi && countWidget > 1) {
            const findIndexById = currentWidgets.findIndex((item) => item.id === widget.id);
            currentWidgets.splice(findIndexById, 1);
            this.widgets$.next(currentWidgets);
        } else {
            this.changeWidgetStatus(widget, false);
        }

        setTimeout(() => {
            this.scrollTo('.dashboard-grid-inactive');
            const el = this.document.querySelector('gridster-preview') as any;
            el.style.display = '';
        }, 100);
    }

    private checkMultiWidget(widget: DashboardWidgetModel): boolean {
        return this.widgets$.value.some((item) => item.active && item.identifier === widget.identifier);
    }

    private changeWidgetStatus(widget: DashboardWidgetModel, active: boolean): void {
        let currentWidgets = this.widgets$.value;
        currentWidgets = currentWidgets.map((item) => {
            if (item.identifier === widget.identifier) {
                return {
                    ...item,
                    active
                };
            }
            return item;
        });
        this.widgets$.next(currentWidgets);
    }

    private countWidget(identifier: DashboardWidgetUnionType): number {
        return this.widgets$.value.filter((item) => item.identifier === identifier)?.length;
    }

    private generateWidgetId(widget: DashboardWidgetModel): string {
        const randomId = Math.floor(Math.random() * 1000000000);
        const countWidget = this.countWidget(widget.identifier);
        return countWidget > 0 ? `${widget.identifier}_${randomId}` : widget.identifier;
    }

    scrollTo(selector: string): void {
        const el = this.document.querySelector(selector);
        if (el) {
            el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }

    // private get configByRoleFactory(): DashboardWidgetModel[] {
    //     let config: WidgetTransformInterface;
    //
    //     switch (this.profileQuery.role) {
    //         case RoleEnum.Affiliate:
    //             // config = new AffiliateWidgetTransform(affiliateWidgetsConfig, this.platformSettingsQuery.settings);
    //             break;
    //         case RoleEnum.LimitedAffiliateManager:
    //             // config = new LimitedAffiliateWidgetTransform(limitedAffiliateManagerWidgetsConfig, this.profileQuery.showNetworkRevenue);
    //             break;
    //         case RoleEnum.LimitedAdvertiserManager:
    //             // config = new LimitedAdvertiserWidgetTransform(limitedAdvertiserManagerWidgetsConfig, this.profileQuery.showNetworkRevenue);
    //             break;
    //         default:
    //         // return getConfigForAdminFactory(this.envService);
    //     }
    //
    //     // return config.transform() as DashboardWidgetModel[];
    //     return [];
    // }
}
