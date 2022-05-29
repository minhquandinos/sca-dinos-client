import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TeammateUpsertApi } from './teammate-upsert.api';
import { TeammateUpsertPayloadDto, TeammateUpsertViewModel } from './teammate-upsert.model';

@Injectable()
export class TeammateUpsertService {
    constructor(private api: TeammateUpsertApi) {}

    view(id: number): Observable<TeammateUpsertViewModel> {
        return this.api.view(id);
    }

    create(post: TeammateUpsertPayloadDto): Observable<TeammateUpsertViewModel> {
        return this.api.create(post);
    }

    update(id: number | string, post: TeammateUpsertPayloadDto): Observable<TeammateUpsertViewModel> {
        return this.api.update(id, post);
    }

    delete(editId: number, active_managers: number): Observable<void> {
        return this.api.delete(editId, active_managers);
    }

    deleteImage(id: number | string): Observable<void> {
        return this.api.deleteImage(id);
    }

    updateApiKey(user_id: number, role: string): Observable<string> {
        return this.api.updateApiKey(user_id, role);
    }
}
