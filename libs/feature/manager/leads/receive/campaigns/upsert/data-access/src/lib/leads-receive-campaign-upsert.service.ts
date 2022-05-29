import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { LeadsReceiveCampaignUpsertApi } from './leads-receive-campaign-upsert.api';
import { LeadsReceiveCampaignViewModel } from './models/leads-receive-campaign-view.model';

@Injectable()
export class LeadsReceiveCampaignUpsertService {
    constructor(private api: LeadsReceiveCampaignUpsertApi, private jsonConvertService: JsonConvertService) {}

    public view(id: number): Observable<LeadsReceiveCampaignViewModel> {
        return this.api.view(id).pipe(
            map((campaign) => {
                return this.jsonConvertService.mapper(LeadsReceiveCampaignViewModel, campaign);
            })
        );
    }

    public create(campaign: LeadsReceiveCampaignViewModel): Observable<LeadsReceiveCampaignViewModel> {
        return this.api.create(campaign);
    }

    public update(id: number, campaign: LeadsReceiveCampaignViewModel): Observable<LeadsReceiveCampaignViewModel> {
        return this.api.update(id, campaign);
    }

    public delete(id: number): Observable<void> {
        return this.api.delete(id);
    }
}
