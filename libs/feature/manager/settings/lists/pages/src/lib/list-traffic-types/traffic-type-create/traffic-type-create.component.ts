import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, take } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { BaseListUpsertComponent } from '../../base-list-upsert.component';
import { BasicListsAdministrationInterface, excludePlatformStatus } from '../../lists.administration.interface';
import { ListsAdministrationService } from '../../lists.administration.service';

@Component({
    selector: 'scaleo-mng-traffic-type-create',
    templateUrl: './traffic-type-create.component.html',
    styleUrls: ['./traffic-type-create.component.css'],
    providers: [UnsubscribeService]
})
export class TrafficTypeCreateComponent extends BaseListUpsertComponent implements OnInit {
    title$ = this.getTitle('create');

    buttonLabel$ = this.getButtonLabel('create');

    trafficType: BasicListsAdministrationInterface;

    form: FormGroup;

    readonly excludeStatus = excludePlatformStatus;

    constructor(
        private _listsAdministrationService: ListsAdministrationService,
        private _formBuilder: FormBuilder,
        private _translate: TranslateService,
        private _modal3Service: Modal3Service,
        private _modal3EditFormRef: Modal3EditFormRef,
        private _toastr: ToastrBarService,
        private _unsubscribe: UnsubscribeService
    ) {
        super();
        this.editId = this._modal3EditFormRef.config.data?.editId;
    }

    ngOnInit(): void {
        this._initForm();

        if (this.editId) {
            this.title$ = this.getTitle('update');
            this.buttonLabel$ = this.getButtonLabel('update');
            this._getTag();
        }
    }

    add(): void {
        if (this.form.valid) {
            const post: BasicListsAdministrationInterface = { ...this.form.value };

            const addUpdate = this.editId
                ? this._listsAdministrationService.updateTrafficType(this.editId, post)
                : this._listsAdministrationService.createTrafficType(post);

            addUpdate.pipe(take(1)).subscribe(() => {
                this.form.reset();
                this._modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);

                const messageTranslateKey = this.editId
                    ? 'administration_settings.lists.traffic_types.notification.update'
                    : 'administration_settings.lists.traffic_types.notification.create';
                this._toastr.successes(this._translate.instant(messageTranslateKey));
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    setStatus(status: number): void {
        this.form.patchValue({ status });
    }

    delete(): void {
        const modalRef$ = this._modal3Service.confirm(this._translate.instant('administration_settings.lists.delete_confirm_text'), {
            title: this._translate.instant('administration_settings.lists.delete_confirm_title')
        });

        modalRef$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this._listsAdministrationService.deleteTrafficType(this.editId)),
                take(1)
            )
            .subscribe(() => {
                this._modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                this._toastr.successes(this._translate.instant('administration_settings.lists.traffic_types.notification.delete'));
            });
    }

    protected getTitle(type: 'create' | 'update'): Observable<string> {
        const translate = 'administration_settings.lists.traffic_types.form';
        const map = {
            create: `${translate}.new`,
            update: `${translate}.update`
        };

        return this._translate.stream(map[type] || map.create);
    }

    private _getTag(): void {
        this._listsAdministrationService
            .getTrafficType(this.editId)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((trafficType) => {
                this.trafficType = trafficType;
                this._loadForm();
            });
    }

    private _initForm(): void {
        this.form = this._formBuilder.group({
            id: [],
            title: ['', Validators.required],
            status: [BooleanEnum.True]
        });
    }

    private _loadForm(): void {
        this.form.patchValue(this.trafficType);
    }
}
