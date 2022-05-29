import { InjectionToken, Provider } from '@angular/core';

import { PLATFORM_PLAN_FEATURE, PlatformPlanFeatureUnionType } from './platform-plan-feature.model';

export const PLATFORM_PLAN_FEATURE_TOKEN = new InjectionToken<PlatformPlanFeatureUnionType>('PlatformPlanFeature');

export const PLATFORM_PLAN_FEATURE_PROVIDER: Provider = {
    provide: PLATFORM_PLAN_FEATURE_TOKEN,
    useValue: PLATFORM_PLAN_FEATURE
};
