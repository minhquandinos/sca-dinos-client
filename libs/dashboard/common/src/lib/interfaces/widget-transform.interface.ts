import { DashboardWidgetModel } from '../model/dashboard-config.model';

export interface WidgetTransformInterface {
    transform(): DashboardWidgetModel | DashboardWidgetModel[];
}
