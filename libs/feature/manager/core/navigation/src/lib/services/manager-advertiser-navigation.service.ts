import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationPathResolverParams } from '@scaleo/core/navigation/common';

import { MANAGER_NAVIGATION_PATH } from '../manager-navigation';

@Injectable()
export class ManagerAdvertiserNavigationService {
    private readonly _path = MANAGER_NAVIGATION_PATH.advertisers;

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
}
