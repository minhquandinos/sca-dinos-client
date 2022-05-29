import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { PathFileService } from '@scaleo/shared/services/path-file';

import {
    AffiliateDashboardAnnouncementsListQueryParamsModel,
    AffiliateDashboardAnnouncementWidgetListDto,
    AffiliateDashboardAnnouncementWidgetListModel
} from '../dashboard-announcement-widget-list.model';

@Injectable()
export class DashboardAnnouncementWidgetListApi {
    constructor(
        private rest: RestApiService,
        private readonly pathFileService: PathFileService,
        private readonly jsonConvertService: JsonConvertService
    ) {}

    index(
        queryParams?: AffiliateDashboardAnnouncementsListQueryParamsModel
    ): Observable<ApiResponseWithPagination<AffiliateDashboardAnnouncementWidgetListModel>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<AffiliateDashboardAnnouncementWidgetListDto>>('announcements-list', options).pipe(
            map(({ headers, body: { info } }) => {
                const { announcements = [] } = info || {};

                const mapper = this.jsonConvertService.mapper(AffiliateDashboardAnnouncementWidgetListModel, announcements);

                const data = mapper.map((announcement: AffiliateDashboardAnnouncementWidgetListModel) => ({
                    ...announcement,
                    image: this.prepareImage(announcement.image),
                    author: this.prepareAuthor(announcement.author)
                }));
                return ResponseUtil.pagination<AffiliateDashboardAnnouncementWidgetListModel>(headers, data);
            })
        );
    }

    private prepareImage(image: string = null): string {
        const type = !image ? 'announcements' : 'empty';
        return this.pathFileService.platformImage(image || null, type);
    }

    private prepareAuthor(authors: ShortManagerModel[]): ShortManagerModel[] {
        return authors.map((author) => ({
            ...author,
            image: this.pathFileService.platformImage(author.image)
        })) as ShortManagerModel[];
    }
}
