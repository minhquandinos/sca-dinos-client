import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { from, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import {
    SettingsBrandingImageType,
    SettingsBrandingModel,
    SettingsBrandingService
} from '@scaleo/feature/manager/data-access/settings/branding';
import { PlatformListsInterface } from '@scaleo/platform/list/access-data';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { CustomValidators, forbiddenCharacters, ValidationMethods } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-branding-form',
    templateUrl: './branding-form.component.html'
})
export class BrandingFormComponent implements OnInit, OnDestroy {
    public form: FormGroup;

    public formData: SettingsBrandingModel;

    public platformLists: PlatformListsInterface;

    public showChangeLogo: boolean;

    public showChangeFavicon: boolean;

    // public showSkipButton: boolean;

    public logo: string;

    public favicon: string;

    public showEditFavicon: boolean;

    public test = 1;

    private unsubscribe: Subject<void> = new Subject<void>();

    readonly isGettingStarted: boolean;

    @Output()
    afterSaved: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private newPlatformSettingsService: NewPlatformSettingsService,
        private readonly pathFileService: PathFileService,
        private validation: ValidationMethods,
        private translate: TranslateService,
        // private gettingStartedNavigateService: GettingStartedService,
        private toastr: ToastrBarService,
        private readonly settingsBrandingService: SettingsBrandingService,
        private readonly route: ActivatedRoute
    ) {
        this.isGettingStarted = this.route.snapshot.data?.['gettingStarted'] || false;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            network_name: new FormControl('', Validators.required),
            logo: new FormControl(''),
            favicon: new FormControl(''),
            main_color: new FormControl('', Validators.required),
            links_color: new FormControl('', Validators.required),
            company_website_url: new FormControl('', [Validators.required, CustomValidators.checkUrl]),
            privacy_policy_url: new FormControl(''),
            terms_and_conditions_url: new FormControl(''),
            login_page_theme_id: new FormControl(''),
            set_theme_automatically: new FormControl(''),
            intercom_client_id: new FormControl(''),
            client_custom_code: new FormControl('', [forbiddenCharacters(['intercom', 'intercomSettings'], 'intercom')])
        });
        // this.initThemes();
        this.patchForm();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public save(): void {
        if (this.form.value.privacy_policy_url) {
            this.form.get('privacy_policy_url').setValidators(CustomValidators.checkUrl);
            this.addHttpToString('privacy_policy_url');
        }

        if (this.form.value.terms_and_conditions_url) {
            this.form.get('terms_and_conditions_url').setValidators(CustomValidators.checkUrl);
            this.addHttpToString('terms_and_conditions_url');
        }
        this.addHttpToString('company_website_url');
        if (this.form.valid) {
            const branding: SettingsBrandingModel = { ...this.form.getRawValue() };
            branding.logo_image_data = this.logo ? this.logo : '';
            branding.favicon_image_data = this.favicon ? this.favicon : '';
            delete branding.logo;
            delete branding.favicon;

            this.settingsBrandingService
                .update(branding)
                .pipe(
                    switchMap(() => this.newPlatformSettingsService.getPlatformSettings()),
                    tap(() => {
                        this.toastr.successes(this.translate.instant('administration_settings.branding.save_notification'));

                        if (this.form.value.client_custom_code !== this.formData.client_custom_code) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        }
                    }),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    this.afterSaved.emit();
                });
        } else {
            this.validation.validateAllFormFields(this.form);
        }
    }

    private patchForm(): void {
        this.settingsBrandingService
            .view()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((branding) => {
                this.formData = branding;
                this.logo = this.formData.logo ? this.pathFileService.platformImage(this.formData.logo, 'platform') : '';
                this.favicon = this.formData.favicon ? this.pathFileService.platformImage(this.formData.favicon, 'platform') : '';
                this.form.patchValue(this.formData);
                this.test = 2;
            });
    }

    public changeLogo(): void {
        this.showChangeLogo = true;
    }

    public changeFavicon(): void {
        this.showChangeFavicon = true;
    }

    public imageWasCropped(event: any, type: SettingsBrandingImageType): void {
        if (type === 'logo') {
            const tempImg = new Image();
            tempImg.src = event;

            setTimeout(() => {
                from(this.imageCrop(tempImg.src, tempImg.width, tempImg.height))
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe((logo) => {
                        this.logo = logo as string;
                        this.showChangeLogo = false;
                    });
            }, 0);
        }

        if (type === 'favicon') {
            this.favicon = event;
            this.showChangeFavicon = false;
        }
    }

    public cancelCropped(type: SettingsBrandingImageType): void {
        if (type === 'logo') {
            this.showChangeLogo = false;
        }

        if (type === 'favicon') {
            this.showChangeFavicon = false;
        }
    }

    private addHttpToString(field: string): void {
        const urlPattern = /http/;

        if (!!urlPattern.test(this.form.get(field).value) === false) {
            this.form.patchValue({
                [field]: `https://${this.form.get(field).value}`
            });
        }
    }

    public deleteImage(field: SettingsBrandingImageType): void {
        this.settingsBrandingService
            .deleteImage(field)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                if (field === 'logo') {
                    this.logo = null;
                }
                if (field === 'favicon') {
                    this.favicon = null;
                }
            });
    }

    private compressImage(src: string, newX: number, newY: number): Promise<string> {
        return new Promise((res, rej) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                const elem = document.createElement('canvas');
                elem.width = newX;
                elem.height = newY;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, newX, newY);
                const data = ctx.canvas.toDataURL();
                res(data);
            };
            img.onerror = (error): any => rej(error);
        });
    }

    private imageCrop(src: string, width: number, height: number): Promise<string> {
        if (width > 342 && height > 117) {
            if (width > height) {
                return this.compressImage(src, 342, (342 * height) / width);
            }
            if (width < height) {
                return this.compressImage(src, (117 * width) / height, 117);
            }
            if (width === height) {
                return this.compressImage(src, 342, 342);
            }
        }

        return of(src).toPromise();
    }
}
