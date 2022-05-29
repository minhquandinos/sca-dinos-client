import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { SHORTCUT_WIDGET_PROVIDER, ShortcutSearchItemEnum } from '@scaleo/dashboard/shared/widgets/shortcut/data-access';
import {
    CheckPermissionService,
    PLATFORM_PERMISSION_TOKEN,
    PlatformPermissionsType,
    PlatformPermissionsUnionType
} from '@scaleo/platform/permission/role';

import { ComponentTaskEnum } from './components/shortcuts-search-items/shortcuts-search-items.component';

interface ItemModel {
    item: ShortcutSearchItemEnum;
    permission: PlatformPermissionsUnionType;
}

@DynamicComponentLookup(DASHBOARD_WIDGET.shortcuts)
@Component({
    selector: 'app-shortcuts-widget',
    templateUrl: './shortcuts-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SHORTCUT_WIDGET_PROVIDER]
})
export class ShortcutsWidgetComponent extends BaseDashboardWidgetComponent implements OnDestroy {
    public componentTaskEnum = ComponentTaskEnum;

    public shortcutSearchItemEnum = ShortcutSearchItemEnum;

    readonly searchItems$: Observable<ShortcutSearchItemEnum[]> = this.items([
        {
            item: ShortcutSearchItemEnum.Offer,
            permission: this.permissions.canAccessOffers
        },
        {
            item: ShortcutSearchItemEnum.Affiliate,
            permission: this.permissions.canAccessAffiliates
        }
    ]);

    readonly loginAsItems$: Observable<ShortcutSearchItemEnum[]> = this.items([
        {
            item: ShortcutSearchItemEnum.Affiliate,
            permission: this.permissions.canAccessAffiliates
        },
        {
            item: ShortcutSearchItemEnum.Advertiser,
            permission: this.permissions.canAccessAdvertisers
        }
    ]);

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(dashboardConfigService, dashboardWidgetService, null);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    private items(items: ItemModel[]): Observable<ShortcutSearchItemEnum[]> {
        return of(items).pipe(
            map((elements: ItemModel[]) => {
                return elements.filter((elem) => this.checkPermissionService.check(elem.permission)).map((elem) => elem.item);
            })
        );
    }
}
