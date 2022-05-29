import { Inject, Injectable } from '@angular/core';
import { defer, EMPTY, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Util } from '@scaleo/utils';

import { ManagerSmartLinkUpsertApi } from './manager-smart-link-upsert.api';
import { SmartLinkFormControlModel, SmartLinkUpsertModel, SmartLinkViewModel } from './manager-smart-link-upsert.model';

@Injectable()
export class ManagerSmartLinkUpsertService {
    constructor(
        private readonly api: ManagerSmartLinkUpsertApi,
        private readonly pathFileService: PathFileService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) private readonly plan: PlatformPlanFeatureType,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    public view(id: number): Observable<SmartLinkViewModel> {
        return this.api
            .view(id)
            .pipe(
                map((smartLink: SmartLinkViewModel) =>
                    Util.cloneObject(smartLink, { image_data: this.pathFileService.platformImage(smartLink.image, 'offers') })
                )
            );
    }

    public create(smartLink: SmartLinkFormControlModel): Observable<SmartLinkUpsertModel> {
        const observable = this.api.create(this.transformSmartLinkForCreate(smartLink));
        return this.checkUpsertPermission$(observable);
    }

    public update(id: number, smartLink: SmartLinkFormControlModel): Observable<SmartLinkUpsertModel> {
        const observable = this.api.update(id, this.transformSmartLinkForCreate(smartLink));
        return this.checkUpsertPermission$(observable);
    }

    public delete(id: number): Observable<void> {
        const observable = this.api.delete(id);
        return this.checkUpsertPermission$(observable);
    }

    public deleteImage(id: number): Observable<void> {
        const observable = this.api.deleteImage(id);
        return this.checkUpsertPermission$(observable);
    }

    private transformSmartLinkForCreate(smartLink: SmartLinkFormControlModel): SmartLinkUpsertModel {
        return {
            ...smartLink,
            image_data: Util.checkBase64Image(smartLink.image_data) ? smartLink.image_data : '',
            offers_with_tags: smartLink.offers_with_tags?.join(',') || '',
            allowed_traffic_types: smartLink.allowed_traffic_types?.join(',') || '',
            traffic_distribution: smartLink.traffic_distribution || 0
        };
    }

    private checkUpsertPermission$<T = unknown>(observable: Observable<T>): Observable<T> {
        return this.checkPermissionService
            .check$([this.plan.smartLink, this.permissions.canAddEditDeleteSmartLinks], 'every')
            .pipe(switchMap((check) => defer(() => (check ? observable : EMPTY))));
    }
}
