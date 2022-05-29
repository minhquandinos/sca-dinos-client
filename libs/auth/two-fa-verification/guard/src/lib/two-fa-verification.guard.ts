import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Auth2faService } from '@scaleo/auth/two-fa-verification/service';

@Injectable({
    providedIn: 'root'
})
export class TwoFaVerificationGuard implements CanActivate {
    constructor(private auth2faService: Auth2faService, private router: Router) {}

    canActivate(): boolean {
        const { service } = this.auth2faService?.config2 || {};

        if (!service) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
