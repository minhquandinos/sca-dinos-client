import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { BaseListUpsertComponent } from '../../base-list-upsert.component';
import { BasicListsAdministrationInterface, excludePlatformStatus } from '../../lists.administration.interface';
import { ListsAdministrationService } from '../../lists.administration.service';

@Component({
    selector: 'scaleo-mng-messenger-create',
    templateUrl: './messenger-create.component.html',
    styleUrls: ['./messenger-create.component.css'],
    providers: [UnsubscribeService]
})
export class MessengerCreateComponent extends BaseListUpsertComponent implements OnInit {
    title$ = this.getTitle('update');

    buttonLabel$ = this.getButtonLabel('update');

    readonly editId: number;

    messenger: BasicListsAdministrationInterface;

    form: FormGroup;

    readonly excludeStatus = excludePlatformStatus;

    constructor(
        private _listsAdministrationService: ListsAdministrationService,
        private _modal3Service: Modal3Service,
        private _modal3EditFormRef: Modal3EditFormRef,
        private _formBuilder: FormBuilder,
        private _translate: TranslateService,
        private _toastr: ToastrBarService,
        private _platformListsService: PlatformListsService,
        private readonly _unsubscribe: UnsubscribeService
    ) {
        super();
        this.editId = this._modal3EditFormRef.config.data?.editId;
    }

    ngOnInit(): void {
        this._initForm();

        if (this.editId) {
            this._getMessenger();
        }
    }

    update() {
        if (this.form.valid) {
            const post: BasicListsAdministrationInterface = { ...this.form.value };

            this._listsAdministrationService
                .updateMessenger(this.editId, post)
                .pipe(
                    tap(() => {
                        this._platformListsService.updateMessenger(this.form.value);
                    }),
                    take(1)
                )
                .subscribe(() => {
                    this.form.reset();
                    this._modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
                    const messageTranslateKey = this.editId
                        ? 'administration_settings.lists.messengers.notification.update'
                        : 'administration_settings.lists.messengers.notification.create';
                    this._toastr.successes(this._translate.instant(messageTranslateKey));
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    getTitle(type: 'create' | 'update'): Observable<string> {
        const translate = 'administration_settings.lists.messengers.form';
        const map = {
            create: `${translate}.new`,
            update: `${translate}.update`
        };
        return this._translate.stream(map[type] || map.create);
    }

    private _getMessenger() {
        this._listsAdministrationService
            .getMessenger(this.editId)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((messenger) => {
                this.messenger = messenger;
                this._loadForm();
            });
    }

    private _initForm() {
        this.form = this._formBuilder.group({
            id: [],
            title: ['', Validators.required],
            status: [BooleanEnum.True]
        });
    }

    private _loadForm() {
        this.form.patchValue(this.messenger);
    }
}
