import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AdvertiserUpsertService } from '@scaleo/feature/manager/advertiser/upsert/data-access';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService, UiSvgIconComponent } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-advertiser-security-token',
    templateUrl: './advertiser-security-token.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserSecurityTokenComponent {
    @Input() id: number;

    @Input() set token(value: string) {
        if (value) {
            this.newToken = value;
        }
    }

    newToken: string;

    @ViewChild('iconRef')
    private iconRef: UiSvgIconComponent;

    constructor(
        private readonly advertiserUpsertService: AdvertiserUpsertService,
        private readonly cdr: ChangeDetectorRef,
        private readonly modal3: Modal3Service,
        private readonly translate: TranslateService,
        private readonly toastr: ToastrBarService
    ) {}

    refresh(): void {
        const content = this.translate.instant('advertiser.postback_security.infos.generate_new_token');
        const toastrTranslateSchema = 'advertiser.postback_security.toastr';
        this.modal3
            .confirm(content, { title: 'areYouSure' })
            .afterClosed$.pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                tap(() => {
                    this.iconRef.startAnimation();
                }),
                switchMap(() =>
                    this.advertiserUpsertService.generatePostbackToken(this.id).pipe(
                        tap((token) => {
                            this.newToken = token;
                            this.toastr.successResponse(`${toastrTranslateSchema}.generate_token_success`);
                            this.cdr.markForCheck();
                        }),
                        catchError((error) => {
                            this.toastr.exception(`${toastrTranslateSchema}.generate_token_exception`);
                            return throwError(error);
                        })
                    )
                ),
                take(1)
            )
            .subscribe();
    }
}
