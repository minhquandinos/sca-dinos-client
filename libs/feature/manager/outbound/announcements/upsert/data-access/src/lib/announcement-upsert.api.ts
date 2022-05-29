import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PathFileService } from '@scaleo/shared/services/path-file';

import {
    AnnouncementTestEmailModel,
    AnnouncementUpsertPayloadDto,
    AnnouncementUpsertViewDto,
    AnnouncementUpsertViewModel
} from './announcement-upsert.model';

@Injectable()
export class AnnouncementUpsertApi {
    constructor(
        private rest: RestApiService,
        private readonly pathFileService: PathFileService,
        private readonly jsonConvertService: JsonConvertService
    ) {}

    view(id: number): Observable<AnnouncementUpsertViewModel> {
        return this.rest.get<AnnouncementUpsertViewDto>('announcements-view', { urlParameters: { id } }).pipe(
            pluck('info', 'announcement'),
            map((announcement) => {
                const mapper = this.jsonConvertService.mapper(AnnouncementUpsertViewModel, announcement);

                return {
                    ...mapper,
                    image_data: this.pathFileService.platformImage(announcement.image, 'announcements')
                };
            })
        );
    }

    create(post: AnnouncementUpsertPayloadDto): Observable<AnnouncementUpsertViewModel> {
        return this.rest.post<AnnouncementUpsertViewModel>('announcements-create', post);
    }

    update(id: number, post: AnnouncementUpsertPayloadDto): Observable<AnnouncementUpsertViewModel> {
        return this.rest.put<AnnouncementUpsertViewModel>('announcements-update', post, { urlParameters: { id } });
    }

    delete(id: number): Observable<void> {
        return this.rest.delete<void>('announcements-delete', { urlParameters: { id } });
    }

    deleteImage(id: number): Observable<void> {
        return this.rest.delete<any>('announcements-delete-image', { urlParameters: { id } });
    }

    sendTestEmail(email: AnnouncementTestEmailModel): Observable<void> {
        return this.rest.post<AnnouncementTestEmailModel>('announcements-send-test-email', email);
    }
}
