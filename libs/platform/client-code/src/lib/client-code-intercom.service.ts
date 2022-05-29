import { Injectable } from '@angular/core';
import { Intercom } from 'ng-intercom';

import { ProfileQuery } from '@scaleo/account/data-access';
import { TrialStatusService } from '@scaleo/trial-service';

import { ClientCodeInterface } from './client-code.interface';

@Injectable({ providedIn: 'root' })
export class ClientCodeIntercomService implements ClientCodeInterface {
    constructor(private intercom: Intercom, private trialStatusService: TrialStatusService, private profileQuery: ProfileQuery) {}

    insert(intercomId: string = 'z7ldbbfp'): void {
        this.intercom.boot({
            app_id: intercomId,
            name: `${this.profileQuery.profile.firstname} ${this.profileQuery.profile.lastname}`,
            email: `${this.profileQuery.profile.email}`,
            created_at: `${this.trialStatusService.getTrialTimestamp}`,
            widget: {
                activator: '#intercom'
            }
        });
    }
}
