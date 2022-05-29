import { DashboardWidgetUnionType } from '../enum/widget.enum';
import { DashboardWidgetModel } from '../model/dashboard-config.model';

export const getWidgetById = (config: DashboardWidgetModel[], widgetId: DashboardWidgetUnionType): DashboardWidgetModel =>
    config.find((widget) => widget.identifier === widgetId);
