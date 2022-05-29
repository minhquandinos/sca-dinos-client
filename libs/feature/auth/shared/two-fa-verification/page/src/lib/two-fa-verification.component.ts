import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, take, takeUntil, tap } from 'rxjs/operators';

import { Auth2faService } from '@scaleo/auth/two-fa-verification/service';
import { ResolveErrorModel } from '@scaleo/core/error/common';
import { TranslateErrorService } from '@scaleo/core/error/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { InputComponent } from '@scaleo/shared/components';
import { ArrayUtil, rxjsOperatorsUtil } from '@scaleo/utils';

@Component({
    selector: 'auth-shared-two-fa-verification',
    templateUrl: './two-fa-verification.component.html',
    providers: [UnsubscribeService]
})
export class TwoFaVerificationComponent implements OnInit, OnDestroy {
    form: FormGroup;

    @ViewChildren(InputComponent)
    inputs: QueryList<InputComponent>;

    disabledSubmit$: Observable<boolean>;

    private _showResendCodeBtn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    readonly showResendCodeBtn$ = this._showResendCodeBtn$.asObservable();

    private _delayTimer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    readonly delayTimer$ = this._delayTimer$.asObservable();

    private _delayTimerId: number;

    error: string;

    readonly email = this._auth2faService.config2.service?.payload?.email;

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _auth2faService: Auth2faService,
        private readonly _router: Router,
        private readonly _unsubscribe: UnsubscribeService,
        private readonly _translateErrorService: TranslateErrorService
    ) {}

    ngOnInit(): void {
        this._initForm();

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                tap(() => {
                    this.form.enable();
                    this._clearedCodesAndFocus();
                }),
                takeUntil(this._unsubscribe)
            )
            .subscribe();

        this.disabledSubmit$ = this.form.get('codes').valueChanges.pipe(
            startWith({}),
            map((codes) => (Object.entries(codes).length > 0 ? !Object.entries(codes).every((items) => ArrayUtil.last(items)) : true)),
            shareReplay()
        );
    }

    ngOnDestroy() {
        if (this._delayTimerId) {
            clearInterval(this._delayTimerId);
        }
    }

    submit() {
        const verifyCode = Object.entries(this.form.get('codes').value)
            .map((items) => ArrayUtil.last(items))
            .join('');
        this.form.disable();
        this.error = undefined;
        // this.showWrong2FACode(false);

        this._auth2faService
            .submit(+verifyCode)
            .pipe(rxjsOperatorsUtil.resolveError(), take(1))
            .subscribe({
                error: (resolveError: ResolveErrorModel) => {
                    this.form.enable();
                    this._clearedCodesAndFocus();
                    if (resolveError.code === 401) {
                        this.error = this._translateErrorService.customTranslate('server_validation.unavailable_login');
                    } else {
                        this._translateErrorService.translate(resolveError.error.message);
                    }
                }
            });
    }

    resendCode() {
        this._auth2faService
            .resendCode()
            .pipe(
                tap(() => {
                    this.error = undefined;
                    this._clearedCodesAndFocus();
                    this._showResendCodeBtn$.next(false);
                    this._initDelayTimer();
                }),
                rxjsOperatorsUtil.resolveError(),
                // this.catchError('server_validation.unavailable_login'),
                take(1)
            )
            .subscribe({
                error: (resolveError: ResolveErrorModel) => {
                    if (resolveError.code === 401) {
                        this.error = this._translateErrorService.customTranslate('server_validation.unavailable_login');
                    } else {
                        this._translateErrorService.translate(resolveError.error.message);
                    }
                }
            });
    }

    onDigitInput(event: KeyboardEvent, index: number) {
        const { value } = event.target as any;

        if (index >= 0 && index <= 3) {
            if (index >= 0 && value) {
                this._focusInput(index + 1);
            }

            if (event.code === 'Backspace' && !value) {
                this._focusInput(index - 1);
            }
        }

        if (index + 1 > 3) {
            this.inputs.get(3)?.elementRef?.nativeElement?.blur();
        }
    }

    private _clearedCodesAndFocus(): void {
        this.form.get('codes').reset();
        this._focusInput(0);
    }

    private _focusInput(index: number = 0): void {
        this.inputs.get(index)?.elementRef?.nativeElement?.focus();
    }

    private _initDelayTimer(): void {
        this._delayTimer$.next(30);
        this._delayTimerId = setInterval(() => {
            const { value } = this._delayTimer$;
            const nextValue = value - 1;

            if (value <= 1) {
                clearInterval(this._delayTimerId);
                this._showResendCodeBtn$.next(true);
            } else {
                this._delayTimer$.next(nextValue);
            }
        }, 1000);
    }

    private _initForm(): void {
        this.form = this._fb.group({
            email: '',
            codes: this._fb.group({
                code1: '',
                code2: '',
                code3: '',
                code4: ''
            })
        });
    }
}
