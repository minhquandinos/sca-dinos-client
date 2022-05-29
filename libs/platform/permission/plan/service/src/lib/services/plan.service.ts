import { Injectable } from '@angular/core';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { PlanType } from '@scaleo/platform-permission-plan-common';

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    constructor(private settingsQuery: PlatformSettingsQuery) {}

    get plan(): PlanType {
        return this.settingsQuery?.settings?.tariffPlan;
    }

    get tariffPlans() {
        return this.settingsQuery?.settings?.tariff_plans;
    }

    get tariffPlan() {
        return this.settingsQuery?.settings?.tariff_plans?.[this.plan];
    }
}
