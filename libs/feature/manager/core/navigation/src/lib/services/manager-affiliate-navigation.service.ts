import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationPathResolverParams } from '@scaleo/core/navigation/common';

import { MANAGER_NAVIGATION_PATH } from '../manager-navigation';

@Injectable()
export class ManagerAffiliateNavigationService {
    private readonly _path = MANAGER_NAVIGATION_PATH.affiliates;

    constructor(private router: Router) {}

    get root(): string {
        return this._path.root.absolute;
    }

    get all(): string {
        return this._path.list.all.absolute;
    }

    get my(): string {
        return this._path.list.my.absolute;
    }

    get pending(): string {
        return this._path.list.pending.absolute;
    }

    detail(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.root, options.params.id];
        return this.router.createUrlTree(commands).toString();
    }

    postbacks(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.root, options.params.id, this._path.subPages.postbacks.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    domains(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.root, options.params.id, this._path.subPages.domains.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    referrals(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.root, options.params.id, this._path.subPages.referrals.routePath];
        return this.router.createUrlTree(commands).toString();
    }

    activityLog(options: NavigationPathResolverParams<{ id: string }>): string {
        const commands = [this.root, options.params.id, this._path.subPages.activityLog.routePath];
        return this.router.createUrlTree(commands).toString();
    }
}
