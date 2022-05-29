import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'auth-approval-required',
    template: `
        <div class="page-content-info d-flex">
            <div class="page-content-wrapper page-content-info__wrapper align-self-center d-flex">
                <div class="page-content-info__inner align-self-center">
                    <div class="page-content-info__title title">
                        {{ 'registration.successes_no_auto_approved.title' | translate }}
                    </div>
                    <div class="page-content-info__message">
                        {{ 'registration.successes_no_auto_approved.message' | translate }}
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupApprovalRequiredComponent {}
