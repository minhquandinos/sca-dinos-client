import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { PlanStore } from '../state/plan.store';

@Injectable({
    providedIn: 'root'
})
export class InitPlanService {
    constructor(private settings: PlatformSettingsQuery, private planState: PlanStore) {}

    async init(): Promise<any> {
        try {
            await firstValueFrom(
                this.settings.settings$.pipe(
                    tap(({ tariffPlan, tariff_plans }) => {
                        if (!tariffPlan && !tariff_plans) {
                            console.error('Tariff plan or tariff plans feature not loaded from platform settings');
                        }
                    }),
                    filter(({ tariffPlan, tariff_plans }) => {
                        return !!tariffPlan && !!tariff_plans;
                    }),
                    tap(({ tariffPlan, availablePlanFeatures }) => {
                        if (availablePlanFeatures?.length > 0) {
                            this.planState.addPlanWithPermissions(tariffPlan, availablePlanFeatures);
                        }
                    })
                )
            );
        } catch (e) {
            console.log(e);
        }
    }
}
