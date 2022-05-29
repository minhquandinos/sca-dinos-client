import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer, filter, Observable, of, Subject, switchMap, take } from 'rxjs';
import { share, takeUntil, tap } from 'rxjs/operators';

import { BooleanEnum, ShortResponseInterface } from '@scaleo/core/data';
import { AdjustmentActionsEnum } from '@scaleo/feature/manager/reports/transactions/adjustment/common';
import {
    AdjustmentUpsertModel,
    MANAGER_ADJUSTMENT_UPSERT_PROVIDER,
    ManagerAdjustmentUpsertService
} from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/data-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { PlatformCurrencyService } from '@scaleo/platform/currency/service';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { PlatformListsInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { requiredFileType } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { AddFieldClass } from './shared/class/add-field.class';

@Component({
    selector: 'app-create-adjustment',
    templateUrl: './manager-adjustment-upsert.component.html',
    providers: [AddFieldClass, MANAGER_ADJUSTMENT_UPSERT_PROVIDER],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ManagerAdjustmentUpsertComponent implements OnInit, OnDestroy {
    readonly editId: number;

    readonly actionId: number;

    readonly disableActionButton: boolean = false;

    public currency = CurrencyEnum.USD;

    public platformLists: Observable<PlatformListsInterface> = this.platformListsService
        .platformListsNew('adjustments_actions,adjustments_conditions,adjustments_optional_parameters,currencies')
        .pipe(share());

    public form: FormGroup;

    public isLoad: boolean;

    public showAmountField: boolean;

    public adjustmentActionsEnum = AdjustmentActionsEnum;

    title$ = defer(() => {
        if (this.editId) {
            const editTitle = this.translate.instant('reports_page.adjustments.detail_as_title');
            return of(`${editTitle} # ${this.editId}`);
        }

        return this.translate.stream('reports_page.adjustments.add_as_title');
    });

    private unsubscribe: Subject<void> = new Subject();

    @ViewChild('modalMessageForInsConvTpl') modalMessageForInsConvTpl: TemplateRef<HTMLElement>;

    constructor(
        private formBuilder: FormBuilder,
        private platformListsService: PlatformListsService,
        private translate: TranslateService,
        private managerAdjustmentUpsertService: ManagerAdjustmentUpsertService,
        private customDateRangeService: CustomDateRangeService,
        private addFieldClass: AddFieldClass,
        private cdr: ChangeDetectorRef,
        private toastr: ToastrBarService,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly modal3Service: Modal3Service,
        private readonly platformCurrencyService: PlatformCurrencyService
    ) {
        const { editId, actionId } = modal3EditFormRef.config.data;
        this.editId = editId;
        this.actionId = actionId;
        this.disableActionButton = !!actionId;
    }

    ngOnInit(): void {
        this.init();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private init(): void {
        this.initForm();
        if (this.editId) {
            this.loadFormData();
        }

        if (!this.editId) {
            this.changeDetail(this.form.getRawValue().action_id);
        }
    }

    closeModal() {
        // this.modalService.destroy();
    }

    private initForm() {
        this.form = this.formBuilder.group({
            action_id: [this.actionId || AdjustmentActionsEnum.ChangeStatus, Validators.required],
            notes: [''],
            status: [2],
            state: null
        });
    }

    public add() {
        if (this.form.valid) {
            delete this.form.value.state;

            const actionId = this.form.value.action_id;

            if (actionId === AdjustmentActionsEnum.ChangePayouts) {
                if (this.form.value.details.goal?.type === 4) {
                    this.form.value.details.new_revenue.currency = '%';
                    this.form.value.details.new_payout.currency = '%';
                } else {
                    const offerCurr = this.form.value.details.offer.currency;
                    this.form.value.details.new_revenue.currency = offerCurr;
                    this.form.value.details.new_payout.currency = offerCurr;
                }
                if (this.form.value.details.goal.id === 0) {
                    delete this.form.value.details.goal;
                }
            }

            if (actionId === AdjustmentActionsEnum.InsertConversions) {
                if (this.form.value.details.goal.id === 0) {
                    delete this.form.value.details.goal;
                }
                if (!this.form.value.details.amount) {
                    delete this.form.value.details.amount;
                }
                // TODO delete after fixed backend SCL-461
                if (!this.form.get('details').value) {
                    this.toastr.successes(this.translate.instant('reports_page.adjustments.details_not_null'));
                    return;
                }
            }

            const post = this.transformFormValueForRequest;

            const addUpdate = this.editId
                ? this.managerAdjustmentUpsertService.update(this.editId, post)
                : this.managerAdjustmentUpsertService.create(post);

            const modal$ = this.modal3Service.confirm(this.getMessageTemplate, {
                title: this.translate.instant('reports_page.adjustments.add_confirm.confirm_title'),
                actionLabel: this.translate.instant('reports_page.adjustments.add_confirm.action'),
                typeButton: 'main'
            });

            modal$.afterClosed$
                .pipe(
                    filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                    switchMap(() => addUpdate),
                    take(1)
                )
                .subscribe(() => {
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Create);
                    this.toastr.successes(
                        this.translate.instant(this.editId ? 'reports_page.adjustments.edited' : 'reports_page.adjustments.created')
                    );
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    private get transformFormValueForRequest(): AdjustmentUpsertModel {
        const post: AdjustmentUpsertModel = { ...this.form.value };
        if (post.action_id === AdjustmentActionsEnum.ChangeStatus) {
            delete post.details.change_date;
        }

        post.details = JSON.stringify(post.details);

        if (+post.action_id !== AdjustmentActionsEnum.InsertConversions) {
            post.conditions = JSON.stringify(this.form.value.conditions);
        } else {
            post.parameters = JSON.stringify(this.form.value.parameters);
        }

        return post;
    }

    private get getMessageTemplate(): TemplateRef<HTMLElement> | string {
        switch (this.form.getRawValue().action_id) {
            case AdjustmentActionsEnum.InsertConversionsViaCSV:
            case AdjustmentActionsEnum.InsertConversions:
                return this.modalMessageForInsConvTpl;
            default:
                return this.translate.instant('reports_page.adjustments.add_confirm.confirm_text');
        }
    }

    delete() {
        const inputs = {
            title: this.translate.instant('delete.delete_confirm_title'),
            message: this.translate.instant('delete.delete_confirm_text')
        };

        const modal$ = this.modal3Service.confirm(this.translate.instant('delete.delete_confirm_text'), {
            title: this.translate.instant('delete.delete_confirm_title')
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.managerAdjustmentUpsertService.delete(this.editId)),
                take(1)
            )
            .subscribe(() => {
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                this.toastr.successes(this.translate.instant('reports_page.adjustments.deleted'));
            });
    }

    private loadFormData() {
        this.isLoad = false;
        this.managerAdjustmentUpsertService
            .view(this.editId)
            .pipe(
                tap((adj) => {
                    this.changeDetail(adj.action_id);
                }),
                tap((adj) => {
                    this.form.patchValue({
                        ...adj,
                        details: adj?.details ? adj.details : this.form.get('details').value
                    });
                }),
                tap((adj) => {
                    if (adj.action_id === AdjustmentActionsEnum.InsertConversions) {
                        this.showAmountField = +this.form.get('details').get('goal')?.value?.type === 4;
                        if (this.showAmountField) {
                            this.form.get('details.amount').setValidators(Validators.required);
                        }
                        const parameters = this.form.get('parameters') as FormArray;
                        const value = adj.parameters;
                        if (value && value.length > 0) {
                            const array = value.map((field: any) => this.addFieldClass.addField(field));
                            array.forEach((item: any) => parameters.push(item));
                        }
                    }

                    if (adj.action_id !== AdjustmentActionsEnum.InsertConversions) {
                        const conditions = this.form.get('conditions') as FormArray;
                        const value = adj.conditions;
                        if (value && value.length > 0) {
                            conditions.removeAt(0);
                            value.forEach((field: any) => {
                                conditions.push(this.addFieldClass.addField(field));
                            });
                        }
                    }
                }),
                tap(() => {
                    this.isLoad = true;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.form.disable();
                this.cdr.detectChanges();
            });
    }

    changeDetail(id: number) {
        this.removeFormControlBeforeChangeAction();
        switch (id) {
            case AdjustmentActionsEnum.ChangeStatus:
                this.changeStatusControl();
                break;
            case AdjustmentActionsEnum.ChangePayouts:
                this.changePayoutsControl();
                break;
            case AdjustmentActionsEnum.InsertConversions:
                this.insertConversionsControl();
                break;
            case AdjustmentActionsEnum.InsertConversionsViaCSV:
                this.insertConversionsViaCsvControl();
                break;
            default:
                break;
        }
    }

    private changeStatusControl(): void {
        this.form.addControl('conditions', this.addConditionsControl());
        this.form.addControl(
            'details',
            this.formBuilder.group({
                new_status: [2, Validators.required],
                change_date: [0],
                fire_affiliate_postback: [1]
            })
        );
    }

    private changePayoutsControl(): void {
        const usdCurrencySymbol = this.platformCurrencyService.sign(CurrencyEnum.USD);

        this.form.addControl('conditions', this.addConditionsControl());
        this.form.addControl(
            'details',
            this.formBuilder.group({
                offer: ['', Validators.required],
                goal: [0, Validators.required],
                new_revenue: this.formBuilder.group({
                    value: [null, Validators.required],
                    currency: [usdCurrencySymbol, Validators.required]
                }),
                new_payout: this.formBuilder.group({
                    value: [null, Validators.required],
                    currency: [usdCurrencySymbol, Validators.required]
                })
            })
        );
    }

    private insertConversionsControl(): void {
        this.form.addControl('parameters', this.formBuilder.array([]));
        this.form.addControl(
            'details',
            this.formBuilder.group({
                conversions_status: [2, Validators.required],
                conversions_quantity: ['', Validators.required],
                amount: null,
                conversions_date: [this.customDateRangeService.rangeTo, Validators.required],
                fire_affiliate_postback: [1],
                offer: [null, Validators.required],
                goal: [null, Validators.required],
                affiliate: [null, Validators.required]
            })
        );
    }

    private insertConversionsViaCsvControl(): void {
        this.form.addControl('source_file', new FormControl('', [Validators.required, requiredFileType('csv')]));

        this.form.addControl('filename', new FormControl(''));
        this.form.addControl(
            'details',
            this.formBuilder.group({
                fire_affiliate_postback: [BooleanEnum.True]
            })
        );
    }

    customSearchFn(term: string, item: ShortResponseInterface) {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term;
    }

    private removeFormControlBeforeChangeAction() {
        const controlsForRemove = ['details', 'conditions', 'parameters', 'source_file', 'filename'];
        controlsForRemove.forEach((control) => this.form.removeControl(control));
    }

    private addConditionsControl(): FormArray {
        return this.formBuilder.array([
            this.formBuilder.group({
                key: ['dates_range', Validators.required],
                dates_range: this.formBuilder.group({
                    from: [this.customDateRangeService.rangeFrom],
                    to: [this.customDateRangeService.rangeTo]
                })
            })
        ]);
    }
}
