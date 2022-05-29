import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainApi } from './domain.api';
import { DomainUpsertPayloadModel, DomainViewModel } from './domain.model';

@Injectable()
export class DomainUpsertService {
    constructor(private readonly api: DomainApi) {}

    public create(id: number, payload: DomainUpsertPayloadModel): Observable<DomainViewModel> {
        return this.api.create(id, payload);
    }

    public update(affiliateId: number, id: number, payload: DomainUpsertPayloadModel): Observable<DomainViewModel> {
        return this.api.update(affiliateId, id, payload);
    }

    public view(affiliateId: number, id: number): Observable<DomainViewModel> {
        return this.api.view(affiliateId, id);
    }

    public delete(affiliateId: number, id: number): Observable<void> {
        return this.api.delete(affiliateId, id);
    }
}
