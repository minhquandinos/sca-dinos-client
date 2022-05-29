import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, of, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { BaseListUpsertComponent } from '../../base-list-upsert.component';
import { BasicListsAdministrationInterface, excludePlatformStatus } from '../../lists.administration.interface';
import { ListsAdministrationService } from '../../lists.administration.service';

@Component({
    selector: 'scaleo-mng-tag-create',
    templateUrl: './tag-create.component.html'
})
export class TagCreateComponent extends BaseListUpsertComponent implements OnInit {
    readonly editId: number;

    tag: BasicListsAdministrationInterface;

    form: FormGroup;

    title$ = this.getTitle('create');

    buttonLabel$ = this.getButtonLabel('create');

    readonly excludeStatus = excludePlatformStatus;

    constructor(
        private _listsAdministrationService: ListsAdministrationService,
        private _modal3Service: Modal3Service,
        private _formBuilder: FormBuilder,
        private _modal3EditFormRef: Modal3EditFormRef,
        private _shared: SharedMethodsService,
        private _toastr: ToastrBarService,
        private _translate: TranslateService
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

            const upsert$ = this.editId
                ? this._listsAdministrationService.updateTag(this.editId, post)
                : this._listsAdministrationService.createTag(post);

            upsert$.pipe(take(1)).subscribe(() => {
                this.form.reset();
                this._modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);

                const messageTranslateKey = this.editId
                    ? 'administration_settings.lists.tags.notification.update'
                    : 'administration_settings.lists.tags.notification.create';
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
                switchMap((event) => {
                    if (event) {
                        return this._listsAdministrationService.deleteTag(this.editId);
                    }
                    return of(null);
                }),
                take(1)
            )
            .subscribe(() => {
                this._modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                this._toastr.successes(this._translate.instant('administration_settings.lists.tags.notification.delete'));
            });
    }

    getTitle(type: 'create' | 'update'): Observable<string> {
        const translate = 'administration_settings.lists.tags.form';
        const map = {
            create: `${translate}.new`,
            update: `${translate}.update`
        };
        return this._translate.stream(map[type] || map.create);
    }

    private _getTag(): void {
        this._listsAdministrationService.getTag(this.editId).subscribe((tag) => {
            this.tag = tag;
            this._loadForm();
        });
    }

    private _initForm(): void {
        this.form = this._formBuilder.group({
            id: [],
            title: ['', Validators.required],
            status: [1]
        });
    }

    private _loadForm(): void {
        this.form.patchValue(this.tag);
    }
}
