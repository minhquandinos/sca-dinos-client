import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ActivityLogInterface, ActivityObjectTypeEnum } from '@scaleo/activity-log/common';
import { BaseObjectModel } from '@scaleo/core/data';
import {
    CheckPermissionService,
    PLATFORM_PERMISSION_TOKEN,
    PlatformPermissionsType,
    PlatformPermissionsUnionType
} from '@scaleo/platform/permission/role';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { BaseRoleUtil } from '@scaleo/platform/role/util';
import { NavigateRootService } from '@scaleo/shared/components';

@Component({
    selector: 'app-link-to-item',
    templateUrl: './link-to-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkToItemComponent implements OnInit {
    @Input() id: number;

    @Input() item: ActivityLogInterface;

    @Input() name: string;

    @Input() type: string;

    @Input() isObject = false;

    isLink: boolean;

    url: string;

    readonly activityObjectTypeEnum = ActivityObjectTypeEnum;

    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly navigateRootService: NavigateRootService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.setUrl();
    }

    private setUrl(): void {
        const url = BaseRoleUtil.isBaseRole(this.profileQuery.baseRole) ? this.getUrlForManager : this.getUrlForAffAdv;

        this.isLink = !!url;
        this.url = this.navigateRootService.path(url);
    }

    private get getUrlForManager(): string {
        const ownerId = this.item.activity.owner_id;
        const urlsMap: BaseObjectModel<string, { permission?: PlatformPermissionsUnionType; defaultRole?: DefaultRoleEnum; url: string }> =
            {
                [ActivityObjectTypeEnum.Affiliate]: {
                    permission: this.permissions.canAccessAffiliates,
                    url: `affiliates/${this.id}`
                },
                [ActivityObjectTypeEnum.Advertiser]: {
                    permission: this.permissions.canAccessAdvertisers,
                    url: `advertisers/${this.id}`
                },
                [ActivityObjectTypeEnum.Offer]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${this.id}`
                },
                [ActivityObjectTypeEnum.Domain]: {
                    permission: this.permissions.canAccessAffiliates,
                    url: `affiliates/${ownerId}`
                },
                [ActivityObjectTypeEnum.Creative]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.LandingPage]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.Tracking]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.Targeting]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.Goal]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.CustomParam]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.AffiliateAccess]: {
                    permission: this.permissions.canAccessOffers,
                    url: `offers/${ownerId}`
                },
                [ActivityObjectTypeEnum.Source]: {
                    permission: this.permissions.canAccessAffiliates,
                    url: `affiliates/${ownerId}`
                },
                [ActivityObjectTypeEnum.Postback]: {
                    permission: this.permissions.canAccessAffiliates,
                    url: `affiliates/${ownerId}`
                },
                [ActivityObjectTypeEnum.GloabalPostback]: {
                    permission: this.permissions.canAccessAffiliates,
                    url: `affiliates/${ownerId}`
                },
                [ActivityObjectTypeEnum.Announcement]: {
                    permission: this.permissions.canAccessActivityLog,
                    url: 'outbound/announcements'
                },
                [ActivityObjectTypeEnum.Manager]: {
                    defaultRole: DefaultRoleEnum.Admin,
                    url: 'settings/teammates'
                }
            };

        const { url = undefined, permission = undefined, defaultRole = undefined } = urlsMap?.[this.type] || {};

        if (!permission && defaultRole === this.profileQuery.role) {
            return url;
        } else if (permission && this.checkPermissionService.check(permission)) {
            return url;
        }

        return undefined;
    }

    private get getUrlForAffAdv(): string {
        if (this.item.activity.object_type === ActivityObjectTypeEnum.Postback && this.type === ActivityObjectTypeEnum.Offer) {
            return `offers/${this.item.activity.target_id}`;
        }

        switch (this.type) {
            case ActivityObjectTypeEnum.Creative:
            case ActivityObjectTypeEnum.LandingPage:
            case ActivityObjectTypeEnum.Tracking:
            case ActivityObjectTypeEnum.Offer:
            case ActivityObjectTypeEnum.Targeting:
            case ActivityObjectTypeEnum.Goal:
            case ActivityObjectTypeEnum.AffiliateAccess:
                return `offers/${this.item.activity.owner_id}`;
            case ActivityObjectTypeEnum.Postback:
                return `tools/postbacks/all`;
            case ActivityObjectTypeEnum.GloabalPostback:
                return `tools/postbacks/global`;
            default:
                return '';
        }
    }

    // private get getIsLink(): boolean {
    //     const permittedLinks: string[] = [
    //         'offer',
    //         'postback',
    //         'gloabal_postback',
    //         'creative',
    //         'custom_param',
    //         'tracking',
    //         'targeting',
    //         'goal'
    //     ];
    //
    //     return (
    //         (!this.isObject || this.item.activity.action_id !== ActivityActionEnum.Delete) &&
    //         (BaseRoleUtil.isBaseRole(this.profileQuery.baseRole) || permittedLinks.includes(this.type))
    //     );
    // }
}
