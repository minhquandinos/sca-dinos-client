import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { StatisticDefaultRowModel } from '@scaleo/reports/common';
import { NavigateRootService } from '@scaleo/shared/components';
import { Util } from '@scaleo/utils';

import { ReportLinkFieldModel } from '../model/report-format-field.model';
import { BaseReportFieldComponent } from './base-report-field.component';

@Component({ template: '' })
export abstract class BaseReportFieldLinkComponent<T = unknown> extends BaseReportFieldComponent<T> implements OnInit {
    additionalClass: string;

    protected constructor(
        protected navigateRootService: NavigateRootService,
        protected checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) protected permissions: PlatformPermissionsType
    ) {
        super();
    }

    ngOnInit(): void {
        switch (this.key) {
            case 'affiliate':
            case 'advertiser':
            case 'offer':
                this.additionalClass = 'field-with-long-name';
                break;
            default:
                break;
        }
    }

    protected link(type: string, field: StatisticDefaultRowModel): Observable<ReportLinkFieldModel> {
        if (!field.id || !field.value || field.id === 0 || field.value === '') {
            return of(null);
        }
        return of({
            link: this.url(type, field.id),
            title: field.value as string,
            id: field.id
        });
    }

    private url(type: string, id: number): string {
        const rootUrl = (path: string) => this.navigateRootService.path(path);
        const offerUrl = rootUrl(`/offers/${id}`);

        const checkPermission = (permission: string, url: string): string | undefined => {
            if (this.checkPermissionService.check(permission)) {
                return url;
            }
            return undefined;
        };

        const urlPermission = (() => {
            const offer = () => checkPermission(this.permissions.canAccessOffers, offerUrl);
            const affiliate = () => checkPermission(this.permissions.canAccessAffiliates, rootUrl(`/affiliates/${id}`));
            const advertiser = () => checkPermission(this.permissions.canAccessAdvertisers, rootUrl(`/advertisers/${id}`));

            return {
                offer,
                affiliate,
                advertiser
            };
        })();

        const urlMap: BaseObjectModel = {
            affiliate: urlPermission.affiliate(),
            offer: urlPermission.offer(),
            advertiser: urlPermission.advertiser(),
            link: urlPermission.offer(),
            goal: urlPermission.offer(),
            creative: urlPermission.offer()
        };

        return urlMap[type] || undefined;
    }

    protected getId(field: string): number {
        return field ? Util.matchNum(field) : undefined;
    }

    protected getValue(field: string, excludeId: number): string {
        return excludeId ? field?.replace(excludeId?.toString(), '')?.trim() : undefined;
    }
}
