import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActivityLogInterface } from '@scaleo/activity-log/common';
import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { PathFileService } from '@scaleo/shared/services/path-file';

@Injectable({
    providedIn: 'root'
})
export class ActivityLogApi {
    constructor(private rest: RestApiService, private readonly pathFileService: PathFileService) {}

    index<T, Q>(queryParams: Q): Observable<ApiResponseWithPagination<T>> {
        const options: RestApiOptions = {
            request: {
                params: RequestUtil.queryParams(queryParams),
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<T>>('activity-log', options).pipe(
            map((response) => {
                const data = response.body.info.rows.map((obj: any) => ({
                    id: guid(),
                    ...obj,
                    activity: {
                        ...obj.activity,
                        action_title: this.convertString(obj.activity.action_title),
                        object_type: this.checkObjectType(obj.activity.object_type, obj),
                        owner_type: obj.activity.owner_type.toLowerCase(),
                        old_values: this.refactoreValues(obj.activity.old_values),
                        new_values: this.refactoreValues(obj.activity.new_values),
                        target_type: this.convertString(obj.activity.target_type)
                    },
                    user: {
                        ...obj.user,
                        image: this.pathFileService.platformImage(obj.user.image)
                    }
                }));
                return ResponseUtil.pagination<T>(response.headers, data);
            })
        );
    }

    // activityLists(params: ActivityLogRequestModel): Observable<ApiResponseWithPagination<ActivityLogInterface>> {
    //     const options: RestApiOptions = {
    //         request: {
    //             params: RequestUtil.queryParams(params),
    //             observe: 'response'
    //         }
    //     };
    //
    //     return this.rest.get<ApiResponse<ActivityLogInterface>>('activity-log', options).pipe(
    //         map((response) => {
    //             const data = response.body.info.rows.map((obj: any) => ({
    //                 ...obj,
    //                 activity: {
    //                     ...obj.activity,
    //                     action_title: this.convertString(obj.activity.action_title),
    //                     object_type: this.checkObjectType(obj.activity.object_type, obj),
    //                     owner_type: obj.activity.owner_type.toLowerCase(),
    //                     old_values: this.refactoreValues(obj.activity.old_values),
    //                     new_values: this.refactoreValues(obj.activity.new_values),
    //                     target_type: this.convertString(obj.activity.target_type)
    //                 },
    //                 user: {
    //                     ...obj.user,
    //                     role: obj.user?.role ? this.convertString(obj.user.role) : '',
    //                     image: this.pathFileService.platformImage(obj.user.image)
    //                 }
    //             }));
    //             return ResponseUtil.pagination<ActivityLogInterface>(response.headers, data);
    //         })
    //     );
    // }

    refactoreValues(values: any): string {
        if (values) {
            return JSON.stringify(values, null, 2).trim();
        }
        return '';
    }

    checkObjectType(type: string, obj: ActivityLogInterface): string {
        if (type === 'Postback' && obj.activity.target_id === 0) {
            type = 'gloabal_postback';
        }
        return type.toLowerCase().replace(/ /g, '_');
    }

    private convertString(str: string): string {
        return str?.toLowerCase().replace(/ /g, '_');
    }
}
