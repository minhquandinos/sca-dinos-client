import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { from, Observable } from 'rxjs';

import { PlanType, PLATFORM_PLAN, PLATFORM_PLAN_FEATURE, PlatformPlanFeatureUnionType } from '@scaleo/platform-permission-plan-common';

import { PlanService } from './plan.service';

@Injectable({
    providedIn: 'root'
})
export class PlanFeatureService {
    constructor(private permissionsService: NgxPermissionsService, private planService: PlanService) {}

    hasFeature(feature: PlatformPlanFeatureUnionType): boolean {
        return !!this.permissionsService.getPermission(feature);
    }

    hasFeature$(feature: PlatformPlanFeatureUnionType | PlatformPlanFeatureUnionType[]): Observable<boolean> {
        return from(this.permissionsService.hasPermission(feature));
    }

    get allowSmartLink(): boolean {
        return this.hasFeature(PLATFORM_PLAN_FEATURE.smartLink);
    }

    featureInPlan(feature: PlatformPlanFeatureUnionType): PlanType {
        if (feature && !this.hasFeatureInPlan(feature)) {
            return Object.values(PLATFORM_PLAN).find((plan) => this.hasFeatureInPlan(feature, plan));
        }
        return undefined;
    }

    private hasFeatureInPlan(checkFeature: PlatformPlanFeatureUnionType, platformPlan?: PlanType): boolean {
        let plan: PlanType = platformPlan;
        if (!platformPlan) {
            plan = this.planService.plan;
        }
        return this.planService.tariffPlans[plan]?.some((feature) => feature === checkFeature);
    }
}
