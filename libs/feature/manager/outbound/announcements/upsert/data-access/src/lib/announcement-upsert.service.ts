import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnnouncementUpsertApi } from './announcement-upsert.api';
import { AnnouncementTestEmailModel, AnnouncementUpsertPayloadDto, AnnouncementUpsertViewModel } from './announcement-upsert.model';

@Injectable()
export class AnnouncementUpsertService {
    constructor(private api: AnnouncementUpsertApi) {}

    view(id: number): Observable<AnnouncementUpsertViewModel> {
        return this.api.view(id);
    }

    create(post: AnnouncementUpsertPayloadDto): Observable<AnnouncementUpsertViewModel> {
        return this.api.create(post);
    }

    update(id: number, post: AnnouncementUpsertPayloadDto): Observable<AnnouncementUpsertViewModel> {
        return this.api.update(id, post);
    }

    delete(id: number): Observable<void> {
        return this.api.delete(id);
    }

    deleteImage(id: number): Observable<void> {
        return this.api.deleteImage(id);
    }

    sendTestEmail(email: AnnouncementTestEmailModel): Observable<void> {
        return this.api.sendTestEmail(email);
    }
}
