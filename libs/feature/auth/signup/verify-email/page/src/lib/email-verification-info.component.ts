import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { SIGNUP_VERIFICATION_PROVIDER, SignupEmailVerificationService } from '@scaleo/feature/auth/signup/verify-email/data-access';

export enum EmailVerificationInfoEnum {
    Sent = 'sent',
    Successful = 'successful',
    Failed = 'failed'
}

@Component({
    selector: 'auth-email-verification-info',
    templateUrl: './email-verification-info.component.html',
    providers: [SIGNUP_VERIFICATION_PROVIDER]
})
export class EmailVerificationInfoComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject<void>();

    public readonly emailVerificationInfoEnum = EmailVerificationInfoEnum;

    public emailVerificationInfoType:
        | EmailVerificationInfoEnum.Sent
        | EmailVerificationInfoEnum.Successful
        | EmailVerificationInfoEnum.Failed;

    constructor(private activatedRoute: ActivatedRoute, private api: SignupEmailVerificationService) {}

    ngOnInit(): void {
        this.checkUserToken();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private checkUserToken() {
        this.activatedRoute.params
            .pipe(
                switchMap((params) => {
                    const { token }: { token?: string } = params;
                    if (token) {
                        return this.api.checkUserToken(token);
                    }
                    this.emailVerificationInfoType = EmailVerificationInfoEnum.Sent;
                    return EMPTY;
                }),
                filter((params) => params !== undefined),
                catchError(() => {
                    this.emailVerificationInfoType = EmailVerificationInfoEnum.Failed;
                    return of(false);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((res) => {
                if (res) {
                    this.emailVerificationInfoType = EmailVerificationInfoEnum.Successful;
                }
            });
    }
}
