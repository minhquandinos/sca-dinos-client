import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import { EnvService } from '@scaleo/core/services/env';
import { DateUtil } from '@scaleo/platform/date/util';

@Injectable({ providedIn: 'root' })
export class TrialStatusService {
    constructor(private readonly env: EnvService) {}

    get getTrial(): boolean {
        return this.env.trial;
    }

    get getTrialTimestamp(): number {
        return this.env.trialTimestamp;
    }

    get getTrialExpiredDays(): Moment {
        return DateUtil.moment(this.getTrialTimestamp).add(14, 'days');
    }
}
