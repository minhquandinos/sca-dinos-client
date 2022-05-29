import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { Util } from '@scaleo/utils';

interface RedirectUrlMap {
    old: string;
    new: string;
}

const redirectMap: RedirectUrlMap[] = [
    {
        old: '/auth/signup-advertiser',
        new: 'signup/advertiser'
    },
    {
        old: '/auth/signup-affiliate',
        new: 'signup/affiliate'
    }
];

@Injectable({
    providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
    constructor(private readonly router: Router, private readonly window: WindowRefService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const { href } = this.window.nativeWindow.location;
        const url = new URL(href);
        const originalRequestUrl = url.pathname;

        if (this.isOldUrl(originalRequestUrl)) {
            const newPath = this.redirectUrl(originalRequestUrl);
            this.router.navigateByUrl(`${newPath}${url.search}`);
            return false;
        }

        return true;
    }

    private findOldUrl(oldUrl: string): RedirectUrlMap {
        return redirectMap.find((url) => url.old === oldUrl);
    }

    private isOldUrl(oldUrl: string): boolean {
        return Util.isNotEmpty(this.findOldUrl(oldUrl));
    }

    private redirectUrl(oldUrl: string): string {
        return this.findOldUrl(oldUrl)?.new || undefined;
    }
}
