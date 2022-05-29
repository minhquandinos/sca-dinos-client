import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationPathResolverParams, NavigationPathResolverQueryParams } from '@scaleo/core/navigation/common';

import { MANAGER_NAVIGATION_PATH } from '../manager-navigation';

export type DetailParams = NavigationPathResolverParams<{ id: number | string }> &
    NavigationPathResolverQueryParams<{ affiliateId: number | string; lang: string }>;

@Injectable()
export class ManagerOfferNavigationService {
    private readonly _path = MANAGER_NAVIGATION_PATH.offers;

    constructor(private router: Router) {}

    get main(): string {
        return this._path.root.absolute;
    }

    get all(): string {
        return this._path.list.all.absolute;
    }

    get featured(): string {
        return this._path.list.featured.absolute;
    }

    get requests(): string {
        return this._path.list.requests.absolute;
    }

    get smartLinks(): string {
        return this._path.list.smartLinks.absolute;
    }

    detail(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.main, options.params.id];
        return this.router.createUrlTree(commands).toString();
    }

    goals(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.main, options.params.id, this._path.subPages.goals.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    landingPage(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.main, options.params.id, this._path.subPages.landingPage.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    creatives(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.main, options.params.id, this._path.subPages.creatives.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    customParams(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.main, options.params.id, this._path.subPages.customParams.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    activityLog(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.main, options.params.id, this._path.subPages.activityLog.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    detailWithQuery(options: DetailParams): string {
        const commands = [this.main, options.params.id];

        return this.router
            .createUrlTree(commands, {
                queryParams: {
                    affiliateId: options.queryParams?.affiliateId,
                    lang: options.queryParams?.lang ?? 'en'
                }
            })
            .toString();
    }
}
