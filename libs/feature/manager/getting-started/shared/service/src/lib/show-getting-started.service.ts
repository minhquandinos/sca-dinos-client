import { Inject, Injectable } from '@angular/core';
import { combineLatest, filter, Observable, of, shareReplay, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CheckPermissionService,
    PLATFORM_PERMISSION_TOKEN,
    PLATFORM_PERMISSIONS,
    PlatformPermissionsType
} from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ArrayUtil } from '@scaleo/utils';

type PermissionType = typeof PLATFORM_PERMISSIONS.canAddEditDeleteAffiliates | typeof PLATFORM_PERMISSIONS.canAddEditDeleteOffers;

type CompleteGettingStartedType = 'gettingStartedAffiliate' | 'gettingStartedOffer';

@Injectable()
export class ShowGettingStartedService {
    constructor(
        private readonly checkPermissionService: CheckPermissionService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    showHint(
        isLoad$: Observable<boolean>,
        entities$: Observable<{ id: number }[]>,
        accessPermission: PermissionType,
        completedStep: CompleteGettingStartedType
    ): Observable<boolean> {
        const checkPermission$ = this.checkPermissionService.check$([this.permissions.adminOnly, accessPermission as string], 'every').pipe(
            switchMap((check) => {
                if (check) {
                    return this.platformSettingsQuery.settings$.pipe(
                        map((settings) => {
                            const { show_getting_started } = settings;
                            const completedStepStatus = settings?.[completedStep] || false;
                            return show_getting_started && !completedStepStatus;
                        })
                    );
                }
                return of(false);
            })
        );

        return isLoad$
            .pipe(
                filter((isLoad) => isLoad),
                switchMap(() => {
                    return combineLatest([
                        entities$.pipe(
                            map((entities) => {
                                return !ArrayUtil.first(entities)?.id;
                            }),
                            take(1),
                            shareReplay(1)
                        ),
                        checkPermission$
                    ]);
                })
            )
            .pipe(
                map(([isEntitiesExist, checkPermission]) => {
                    return isEntitiesExist && checkPermission;
                }),
                take(1),
                shareReplay(1)
            );
    }
}
