import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, defer, EMPTY, Observable, of, take, throwError } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    ANNOUNCEMENT_UPSERT_PROVIDER,
    AnnouncementTestEmailModel,
    AnnouncementUpsertItemsVisibleRolesModel,
    AnnouncementUpsertPayloadDto,
    AnnouncementUpsertService,
    AnnouncementUpsertViewModel,
    AnnouncementVisibleRoleEnum
} from '@scaleo/feature/manager/outbound/announcements/upsert/data-access';
import { AnnouncementStatusIdEnum } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';
import { CustomSwitchComponent } from '@scaleo/shared/components';
import { CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Ref, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

const ANNOUNCEMENT_BASIC_TRANSLATE_KEY = 'outbound_page.announcements.basic';

@Component({
    selector: 'scaleo-manager-announcements-edit',
    templateUrl: './announcements-edit.component.html',
    providers: [UnsubscribeService, ANNOUNCEMENT_UPSERT_PROVIDER]
})
export class AnnouncementsEditComponent implements OnInit {
    readonly editId: number;

    readonly title: string;

    readonly buttonLabel: string;

    @ViewChild('sendEmailNotificationSwitch')
    private readonly _sendEmailNotificationSwitchTmp: CustomSwitchComponent;

    public form: FormGroup;

    public testEmailForm: FormGroup;

    public announcementLogo: string;

    public isLoad = false;

    readonly visibleRoleEnum = AnnouncementVisibleRoleEnum;

    readonly itemsVisibleRoles: AnnouncementUpsertItemsVisibleRolesModel[] = this._initItemsVisibleRoles;

    readonly allowSendEmailNotificationToUser = this._getAllowSendEmailNotificationToUser;

    private _mailRoomEmailConfigInfo: Modal3Ref;

    @ViewChild('mailRoomEmailConfigurationDesc', { static: true })
    private readonly _mailRoomEmailConfigurationDesc: TemplateRef<any>;

    @ViewChild('mailRoomEmailConfigFooter', { static: true })
    private readonly _mailRoomEmailConfigFooter: TemplateRef<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private _announcementUpsertService: AnnouncementUpsertService,
        private _translate: TranslateService,
        private _toastr: ToastrBarService,
        private _unsubscribe: UnsubscribeService,
        private _platformSettingsQuery: PlatformSettingsQuery,
        private _planPermissionsService: PlanFeatureService,
        private readonly _modal3: Modal3Service,
        private readonly _modal3Ref: Modal3EditFormRef
    ) {
        this.editId = this._modal3Ref.config.data.editId;
        this.title = this._getTitle;
        this.buttonLabel = this._getButtonLabel;
    }

    ngOnInit(): void {
        this._initForm();
        this._initTestEmailForm();
        if (this.editId) {
            this._getDetail();
        } else {
            this.isLoad = true;
        }
    }

    private _initForm(): void {
        this.form = this._formBuilder.group({
            title: ['', Validators.required],
            status: AnnouncementStatusIdEnum.Draft,
            image: '',
            image_data: '',
            content: ['', Validators.required],
            visible_for: AnnouncementVisibleRoleEnum.Affiliate,
            pin_to_top: BooleanEnum.False,
            connected_offers: [],
            send_notification_to_users: BooleanEnum.False,
            emails_sent_flag: BooleanEnum.False
        });
    }

    private _initTestEmailForm(): void {
        this.testEmailForm = this._formBuilder.group({
            email: ['', [CustomValidators.email, Validators.required]]
        });
    }

    private _getDetail(): void {
        this._announcementUpsertService
            .view(this.editId)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((announcement: AnnouncementUpsertViewModel) => {
                const { image } = announcement;
                if (image) {
                    this.announcementLogo = announcement.image_data;
                }
                console.log(announcement);
                this.form.patchValue({ ...announcement });
                this.isLoad = true;
            });
    }

    delete() {
        const content = this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.delete_confirm_text`);
        const title = this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.delete_confirm_title`);

        this._modal3
            .confirm(content, {
                title
            })
            .afterClosed$.pipe(
                switchMap(({ type }) =>
                    type === Modal3CloseEventEnum.Confirm ? this._announcementUpsertService.delete(this.editId) : EMPTY
                ),
                take(1)
            )
            .subscribe(() => {
                this._toastr.successes(this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.deleted`));
                this._modal3Ref.close(null, Modal3CloseEventEnum.Delete);
            });
    }

    add() {
        if (this.form.valid) {
            const { send_notification_to_users, emails_sent_flag } = this.form.getRawValue();

            const post: AnnouncementUpsertPayloadDto = this._formatAnnouncementForAdding;

            const addEditRequest = this.editId
                ? this._announcementUpsertService.update(this.editId, post)
                : this._announcementUpsertService.create(post);

            defer(() => (send_notification_to_users && !emails_sent_flag ? this._canCreateAnnouncementAfterClosedConfirm$ : of(true)))
                .pipe(
                    switchMap((canSendReq) => (canSendReq ? addEditRequest : EMPTY)),
                    catchError((error) => {
                        if (error) {
                            this._toastr.displayValidationMessages(error);
                        }
                        return throwError(error);
                    }),
                    take(1)
                )
                .subscribe(() => {
                    const message = this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.${this.editId ? 'edited' : 'created'}`);
                    const closeEvent = this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create;
                    this._toastr.successes(message);
                    this._modal3Ref.close(null, closeEvent);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    changeImage(logo: string) {
        this.announcementLogo = logo;
    }

    deleteImage(): void {
        this._announcementUpsertService
            .deleteImage(this.editId)
            .pipe(take(1))
            .subscribe(() => {
                this.announcementLogo = '';
                this.form.patchValue({
                    image: ''
                });
            });
    }

    closeMailRoomEmailConfigInfo(): void {
        this._mailRoomEmailConfigInfo.close();
        this._mailRoomEmailConfigInfo = null;
    }

    private get _canCreateAnnouncementAfterClosedConfirm$(): Observable<boolean> {
        const content = this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.create_confirm_text`);
        const title = this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.create_confirm_title`);
        const action = this.buttonLabel;

        return this._modal3
            .confirm(content, {
                title,
                typeButton: 'main',
                actionLabel: action
            })
            .afterClosed$.pipe(map(({ type }) => type === Modal3CloseEventEnum.Confirm));
    }

    private get _formatAnnouncementForAdding(): AnnouncementUpsertPayloadDto {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { connected_offers, visible_for, image } = this.form.getRawValue();
        return {
            ...this.form.value,
            connected_offers: visible_for === AnnouncementVisibleRoleEnum.Affiliate && connected_offers ? connected_offers.join(',') : '',
            image_data: Util.checkBase64Image(this.announcementLogo) || image
        };
    }

    private get _initItemsVisibleRoles(): AnnouncementUpsertItemsVisibleRolesModel[] {
        return [AnnouncementVisibleRoleEnum.Affiliate, AnnouncementVisibleRoleEnum.Advertiser].map((role) => ({
            id: role,
            title: this._translate.stream(`outbound_page.announcements.visible_for.${role}`)
        }));
    }

    public changeSendNotificationUser(changeValue: boolean): void {
        if (changeValue && !this._platformSettingsQuery.settings.custom_smtp_host) {
            this.form.patchValue({
                send_notification_to_users: BooleanEnum.False
            });
            this._sendEmailNotificationSwitchTmp.uiSwitchComponent.checked = false;
            this._openConfigureMailRoomEmailModal();
        }
    }

    public sendTestEmail(): void {
        if (this.testEmailForm.valid && this.form.valid) {
            const { title, content } = this.form.getRawValue();
            const { email } = this.testEmailForm.getRawValue();
            const input: AnnouncementTestEmailModel = {
                subject: title,
                body: content,
                email
            };

            this._announcementUpsertService
                .sendTestEmail(input)
                .pipe(
                    catchError((error) => {
                        this._toastr.error(this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.send_a_test_email.wrong`));
                        return throwError(error);
                    }),
                    takeUntil(this._unsubscribe)
                )
                .subscribe(() => {
                    this._toastr.successes(this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.send_a_test_email.successfully`));
                });
        } else {
            this.form.markAllAsTouched();
            this.testEmailForm.markAllAsTouched();
        }
    }

    private _openConfigureMailRoomEmailModal(): void {
        this._mailRoomEmailConfigInfo = this._modal3.info(this._mailRoomEmailConfigurationDesc, {
            title: this._translate.instant(`${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.mailroom_email_configuration.title`),
            footer: {
                template: this._mailRoomEmailConfigFooter
            }
        });
    }

    private get _getAllowSendEmailNotificationToUser(): boolean {
        return this._planPermissionsService.hasFeature(PLATFORM_PLAN_FEATURE.sendEmailNotificationToUser);
    }

    private get _getTitle(): string {
        const translateSchema = `${ANNOUNCEMENT_BASIC_TRANSLATE_KEY}.${this.editId ? 'edit' : 'creating'}`;
        const translate = this._translate.instant(translateSchema);
        return this.editId ? `${translate} #${this.editId}` : translate;
    }

    private get _getButtonLabel(): string {
        const interfaceBasicTranslateKey = 'shared.dictionary';
        const translateSchema = `${interfaceBasicTranslateKey}.${this.editId ? 'save' : 'add'}`;
        return this._translate.instant(translateSchema);
    }
}
