import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PlanType } from '@scaleo/platform-permission-plan-common';

@Pipe({
    name: 'upgradePlanInfoTitle'
})
export class UpgradePlanInfoTitlePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(plan: PlanType): Observable<string> {
        if (plan) {
            return this.translate.stream(`upgrade_plan.plans.${plan.toLowerCase()}`).pipe(
                switchMap((translatedPlan: string) =>
                    this.translate.stream('upgrade_plan.upgrade_to', {
                        plan: translatedPlan
                    })
                )
            );
        }
        return this.translate.stream('upgrade_plan.title');
    }
}
