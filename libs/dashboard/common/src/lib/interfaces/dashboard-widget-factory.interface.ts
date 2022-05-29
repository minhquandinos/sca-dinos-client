import { Type } from '@angular/core';

export interface DashboardWidgetFactoryInterface {
    getComponent(): Type<any>;
}
