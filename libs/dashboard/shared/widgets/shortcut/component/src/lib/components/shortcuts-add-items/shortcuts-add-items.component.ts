import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { ShortcutSearchItemEnum } from '@scaleo/dashboard/shared/widgets/shortcut/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType, PlatformPermissionsUnionType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';

interface ShortcutSearchItemModel {
    item: ShortcutSearchItemEnum;
    permission: PlatformPermissionsUnionType;
}

@Component({
    selector: 'app-shortcuts-add-items',
    templateUrl: './shortcuts-add-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsAddItemsComponent {
    readonly items: ShortcutSearchItemModel[] = [
        {
            item: ShortcutSearchItemEnum.Offer,
            permission: this.permissions.canAccessOffers
        },
        {
            item: ShortcutSearchItemEnum.Affiliate,
            permission: this.permissions.canAccessAffiliates
        },
        {
            item: ShortcutSearchItemEnum.Advertiser,
            permission: this.permissions.canAccessAdvertisers
        }
    ];

    constructor(
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    createItem(item: ShortcutSearchItemEnum) {
        let urlToItemsList: string;
        switch (item) {
            case ShortcutSearchItemEnum.Advertiser:
                urlToItemsList = '/advertisers';
                break;
            case ShortcutSearchItemEnum.Affiliate:
                urlToItemsList = '/affiliates';
                break;
            case ShortcutSearchItemEnum.Offer:
            default:
                urlToItemsList = '/offers';
                break;
        }

        this.navigateRootService.navigate(urlToItemsList, { create: true });
    }

    trackByFn(index: number, item: ShortcutSearchItemModel): number | ShortcutSearchItemEnum {
        return item?.item || index;
    }
}
