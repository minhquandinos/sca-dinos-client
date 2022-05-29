import { APP_INITIALIZER, Provider } from '@angular/core';

import { InitPlanService } from '../services/init-plan.service';

function initPlan(plan: InitPlanService) {
    return (): any => {
        plan.init();
    };
}

export const INIT_PLATFORM_PLAN: Provider[] = [
    InitPlanService,
    {
        provide: APP_INITIALIZER,
        useFactory: initPlan,
        deps: [InitPlanService],
        multi: true
    }
];
