import { Component, OnInit } from '@angular/core';

import { AuthLogoutService } from '@scaleo/auth/logout/service';

@Component({
    selector: 'auth-logout',
    template: ``
})
export class LogoutComponent implements OnInit {
    constructor(private authLogoutService: AuthLogoutService) {}

    async ngOnInit() {
        await this.authLogoutService.logout();
    }
}
