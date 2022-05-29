import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, startWith, take, tap } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { LanguageEnum } from '@scaleo/platform/language/init';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { SecurityApi } from './api/security.api';
import { SecurityControlEnum } from './enums/security-control.enum';
import { SecurityModel } from './models/security.model';
import { SecurityService } from './services/security.service';

const SECURITY_TRANSLATE_SCHEMA = 'administration_settings.security';
const ADVERTISER_SECURITY_TRANSLATE_SCHEMA = 'advertiser.postback_security';
const BASIC_TRANSLATE_SCHEMA = 'interface.basic';

@Component({
    selector: 'scaleo-mng-security',
    templateUrl: './security.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SecurityService, SecurityApi, UnsubscribeService]
})
export class SecurityComponent implements OnInit {
    form: FormGroup;

    isLoad = false;

    readonly securityControlEnum = SecurityControlEnum;

    managerLabel$ = this._roleLabel(DefaultRoleEnum.Manager);

    affiliateLabel$ = this._roleLabel(DefaultRoleEnum.Affiliate);

    advertiserLabel$ = this._roleLabel(DefaultRoleEnum.Advertiser);

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _modal3: Modal3Service,
        private readonly _security: SecurityService,
        private readonly _unsubscribe: UnsubscribeService,
        private readonly _translate: TranslateService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _newPlatformSettingsService: NewPlatformSettingsService
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._loadFormData();
    }

    save(): void {
        const formValue: SecurityModel = this.form.value;
        this._security
            .update(formValue)
            .pipe(take(1))
            .subscribe(() => {
                this._newPlatformSettingsService.updateStore(formValue);
            });
    }

    changeTwoFa(event: boolean, controlName: SecurityControlEnum): void {
        const content = this._translate.instant(`${SECURITY_TRANSLATE_SCHEMA}.confirm_content`);
        this._modal3
            .confirm(content, { title: 'areYouSure' })
            .afterClosed$.pipe(
                tap(({ type }) => {
                    if (type === Modal3CloseEventEnum.Cancel) {
                        this.form.get(controlName).reset(event ? BooleanEnum.False : BooleanEnum.True);
                        this._cdr.markForCheck();
                    }
                }),
                take(1)
            )
            .subscribe();
    }

    changeAdvertiserPostbackToken(event: boolean): void {
        const advertiserPostbackTranslate = `${ADVERTISER_SECURITY_TRANSLATE_SCHEMA}.infos`;
        let content;
        if (event) {
            content = `${advertiserPostbackTranslate}.require_token_conversions_on_to_off`;
        } else {
            content = `${advertiserPostbackTranslate}.require_token_conversions_off_to_on`;
        }

        const modalRef$ = this._modal3.confirm(this._translate.instant(content), {
            title: 'areYouSure'
        });

        modalRef$.afterClosed$
            .pipe(
                tap(({ type }) => {
                    if (type === Modal3CloseEventEnum.Cancel) {
                        this.form.get(SecurityControlEnum.AdvertiserPostbackToken).reset(event ? BooleanEnum.False : BooleanEnum.True);
                        this._cdr.markForCheck();
                    }
                }),
                take(1)
            )
            .subscribe();
    }

    private _loadFormData(): void {
        this._security
            .view()
            .pipe(
                filter((data) => !!data),
                tap((data) => {
                    this.form.patchValue(data);
                    this.isLoad = true;
                    this._cdr.markForCheck();
                }),
                take(1)
            )
            .subscribe();
    }

    private _initForm(): void {
        this.form = this._fb.group({
            [SecurityControlEnum.Manager]: [BooleanEnum.False],
            [SecurityControlEnum.Affiliate]: [BooleanEnum.False],
            [SecurityControlEnum.Advertiser]: [BooleanEnum.False],
            [SecurityControlEnum.AdvertiserPostbackToken]: [BooleanEnum.False]
        });
    }

    private _roleLabel(managerRole: DefaultRoleEnum.Manager | DefaultRoleEnum.Affiliate | DefaultRoleEnum.Advertiser): Observable<string> {
        const ruManagerMap = {
            [DefaultRoleEnum.Manager]: `${SECURITY_TRANSLATE_SCHEMA}.manager_label`,
            [DefaultRoleEnum.Affiliate]: `${SECURITY_TRANSLATE_SCHEMA}.affiliate_label`,
            [DefaultRoleEnum.Advertiser]: `${SECURITY_TRANSLATE_SCHEMA}.advertiser_label`
        };

        const enManagerMap = {
            [DefaultRoleEnum.Manager]: `${BASIC_TRANSLATE_SCHEMA}.manager`,
            [DefaultRoleEnum.Affiliate]: `affiliates`,
            [DefaultRoleEnum.Advertiser]: `advertisers`
        };

        return this._translate.onLangChange.pipe(
            startWith({ lang: this._translate.currentLang }),
            map((lang) => {
                const label = lang?.lang === LanguageEnum.Russian ? ruManagerMap[managerRole] : enManagerMap[managerRole];
                const role = this._translate.instant(label);
                return this._translate.instant(`${SECURITY_TRANSLATE_SCHEMA}.two_factor_auth_role`, { role });
            })
        );
    }
}
