import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SignInService } from '@scaleo/feature/auth/data-access/signin';

@Component({
    selector: 'app-password-reset-confirmation',
    templateUrl: './password-reset-confirmation.component.html',
    styleUrls: ['./password-reset-confirmation.component.css']
})
export class PasswordResetConfirmationComponent implements OnInit {
    public routeParams: any = {};

    constructor(private router: Router, private route: ActivatedRoute, private auth: SignInService) {
        this.setRouteParams();
    }

    ngOnInit(): void {
        this.validateConfirmationMessage();
    }

    setRouteParams() {
        this.route.params.subscribe((params) => {
            this.routeParams['email'] = params['email'];
        });
    }

    async validateConfirmationMessage() {
        try {
            await this.auth.validatePasswordResetTokenByEmail(this.routeParams['email']);
        } catch (e) {
            console.log(e);
            this.navigateLoginPage();
        }
    }

    navigateLoginPage() {
        this.router.navigate(['/login']);
    }
}
