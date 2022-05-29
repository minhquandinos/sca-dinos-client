import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { LeadsReceiveCampaignViewModel } from './models/leads-receive-campaign-view.model';

@Injectable()
export class LeadsReceiveCampaignUpsertApi {
    constructor(private readonly rest: RestApiService) {}

    public view(id: number): Observable<LeadsReceiveCampaignViewModel> {
        return this.rest
            .get<LeadsReceiveCampaignViewModel>('leads-receive-campaigns-view', { urlParameters: { id } })
            .pipe(pluck('info', 'leads-receive'));
    }

    public create(campaign: LeadsReceiveCampaignViewModel): Observable<LeadsReceiveCampaignViewModel> {
        return this.rest.post<LeadsReceiveCampaignViewModel>('leads-receive-campaigns-create', campaign);
    }

    public update(id: number, campaign: LeadsReceiveCampaignViewModel): Observable<LeadsReceiveCampaignViewModel> {
        return this.rest.put<LeadsReceiveCampaignViewModel>('leads-receive-campaigns-update', campaign, {
            urlParameters: { id }
        });
    }

    public delete(id: number): Observable<void> {
        return this.rest.delete<any>('leads-receive-campaigns-delete', { urlParameters: { id } });
    }
}
