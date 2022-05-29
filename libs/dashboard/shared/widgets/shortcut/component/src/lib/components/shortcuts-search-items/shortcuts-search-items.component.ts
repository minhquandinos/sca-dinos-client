import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AuthAsService } from '@scaleo/auth/as/service';
import { ShortcutSearchItemEnum, ShortcutWidgetService } from '@scaleo/dashboard/shared/widgets/shortcut/data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { NavigateRootService } from '@scaleo/shared/components';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

export enum ComponentTaskEnum {
    LoginAs = 'loginAs',
    Search = 'search'
}

export type ComponentTask = ComponentTaskEnum.LoginAs | ComponentTaskEnum.Search;

@Component({
    selector: 'app-shortcuts-search-items',
    templateUrl: './shortcuts-search-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsSearchItemsComponent implements OnInit, OnDestroy {
    @Input() items: ShortcutSearchItemEnum[];

    @Input() componentTask: ComponentTask = ComponentTaskEnum.Search;

    public menu: ShortcutSearchItemEnum;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private profileQuery: ProfileQuery,
        private translate: TranslateService,
        private authAsService: AuthAsService,
        private toastr: ToastrBarService,
        private readonly navigateRootService: NavigateRootService,
        private readonly shortcutWidgetService: ShortcutWidgetService
    ) {}

    ngOnInit(): void {
        [this.menu] = this.items;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public switchMenu(type: ShortcutSearchItemEnum): void {
        this.menu = type;
    }

    searching(search: string): void {
        if (search && !Number.isNaN(+search)) {
            const id: number = +search;
            let serviceRequest;

            switch (this.menu) {
                case ShortcutSearchItemEnum.Offer:
                    serviceRequest = this.shortcutWidgetService.offer(id);
                    break;
                case ShortcutSearchItemEnum.Affiliate:
                    serviceRequest = this.shortcutWidgetService.affiliate(id);
                    break;
                case ShortcutSearchItemEnum.Advertiser:
                    serviceRequest = this.shortcutWidgetService.advertiser(id);
                    break;
                default:
                    break;
            }

            serviceRequest
                .pipe(
                    catchError((error) => {
                        this.displayErrorMessage();
                        return throwError(error);
                    }),
                    takeUntil(this.unsubscribe)
                )
                .subscribe((item) => {
                    const deletedStatus = PlatformListsStatusesEnum.Deleted;
                    if (item && item?.status !== deletedStatus) {
                        if (this.componentTask === ComponentTaskEnum.Search) {
                            this.redirectToDetail(item.id);
                        } else {
                            return this.authAsService.login(item.email);
                        }
                    } else {
                        this.displayErrorMessage();
                    }
                });
        }
    }

    trackByFn(index: number): number {
        return index;
    }

    private redirectToDetail(id: number): void {
        switch (this.menu) {
            case ShortcutSearchItemEnum.Offer:
                this.navigateRootService.navigate(`/offers/${id}`);
                break;
            case ShortcutSearchItemEnum.Affiliate:
                this.navigateRootService.navigate(`/affiliates/${id}`);
                break;
            default:
                break;
        }
    }

    private displayErrorMessage(): void {
        const itemTranslate = this.translate.instant(`dashboard_grid.widget.shortcuts.${this.menu}`);
        this.toastr.error(this.translate.instant('dashboard_grid.widget.shortcuts.not_found', { item: itemTranslate }));
    }
}
