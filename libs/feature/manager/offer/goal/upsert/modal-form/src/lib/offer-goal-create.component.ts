import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, defer, EMPTY, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';
import {
    OFFER_GOAL_UPSERT_PROVIDER,
    OfferGoalUpsertModel,
    OfferGoalUpsertPayloadDto,
    OfferGoalUpsertService
} from '@scaleo/feature/manager/offer/goal/upsert/data-access';
import { GoalConverterInput, TrackingMethodsEnum } from '@scaleo/offer/common';
import { GoalsConverter } from '@scaleo/offer/goal/common';
import { CurrencySymbolPipe } from '@scaleo/platform/currency/pipe';
import {
    CONVERSION_STATUSES_ID,
    GoalStatusIdEnum,
    GoalTypeEnum,
    PlatformListsService,
    PlatformListsStatusesEnum
} from '@scaleo/platform/list/access-data';
import { ValidationMethods } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

const GOAL_TRANSLATE_KEY = 'table.column.goal';

@Component({
    selector: 'app-offer-goal-create',
    templateUrl: './offer-goal-create.component.html',
    providers: [GoalsConverter, UnsubscribeService, OFFER_GOAL_UPSERT_PROVIDER, CurrencySymbolPipe]
})
export class OfferGoalCreateComponent implements OnInit, AfterViewInit {
    readonly offerId: number;

    readonly editId: number;

    showDefaultButton: boolean;

    trackingLink: string;

    currency: string = this.offerDetailQuery.currency;

    canRemove: boolean;

    trackingCode: string;

    public form: FormGroup;

    public isLoad: boolean;

    goalTypeEnum = GoalTypeEnum;

    goalIsNotCPC$: Observable<boolean>;

    public displayPostback: boolean;

    public caps: OfferGoalCapModel[];

    disabledStatus = false;

    disabledEditGoalType = false;

    readonly aliasPattern: RegExp = /[^A-Za-z0-9]+/g;

    hasCpc: boolean;

    private _hasCpc$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    hideCpcGoalType$: Observable<number[]>;

    extendsConversionStatuses: number[] = [CONVERSION_STATUSES_ID.trash, CONVERSION_STATUSES_ID.rejected];

    extendsGoalsStatuses: number[] = [GoalStatusIdEnum.Deleted];

    postbackToken: string;

    constructor(
        private formBuilder: FormBuilder,
        private platformListsService: PlatformListsService,
        private validation: ValidationMethods,
        private translate: TranslateService,
        private converter: GoalsConverter,
        private unsubscribe: UnsubscribeService,
        private toastr: ToastrBarService,
        private modal3EditFormRef: Modal3EditFormRef,
        private offerGoalUpsertService: OfferGoalUpsertService,
        private readonly modal3: Modal3Service,
        private offerDetailQuery: OfferDetailQuery
    ) {
        const {
            config: { data }
        } = this.modal3EditFormRef;
        this.offerId = data.offerId;
        this.editId = data.editId;
        this.showDefaultButton = data.showDefaultButton;
    }

    ngOnInit(): void {
        this.initForm();
        this.displayPostback = true;
        this.init();
    }

    ngAfterViewInit(): void {
        this.hideCpcGoalType$ = this._hasCpc$.pipe(
            debounceTime(0),
            map((hasCpc) => {
                const type = this.form.get('type').value;
                if (hasCpc && type !== GoalTypeEnum.CPC) {
                    return [GoalTypeEnum.CPC];
                }
                return [];
            })
        );

        this.changeTypeWatcher();
    }

    public add(): void {
        if (this.form.valid) {
            const { caps, is_default, ...formValue } = this.form.getRawValue();

            const payload: OfferGoalUpsertPayloadDto = {
                ...formValue,
                caps: Util.jsonStringify(caps),
                is_default: Util.booleanToNum(is_default)
            };

            defer(() =>
                this.editId
                    ? this.offerGoalUpsertService.update(this.offerId, this.editId, payload)
                    : this.offerGoalUpsertService.store(this.offerId, payload)
            )
                .pipe(
                    tap((result) => {
                        if (this.editId) {
                            this.modal3EditFormRef.close(result, Modal3CloseEventEnum.Update);
                        } else {
                            this.modal3EditFormRef.close(result, Modal3CloseEventEnum.Create);
                        }
                    })
                )
                .toPromise()
                .then(
                    () => {
                        const translateSchema = this.editId ? 'offers_page.goals.edited' : 'offers_page.goals.created';
                        this.toastr.successResponse(translateSchema);
                    },
                    () => {
                        const toastrType = this.editId ? ToastrBarEventEnum.ExceptionUpdated : ToastrBarEventEnum.ExceptionCreated;
                        this.toastr.response(toastrType, GOAL_TRANSLATE_KEY);
                    }
                );
        } else {
            this.form.markAllAsTouched();
        }
    }

    public typeChange(event: any): void {
        this.showHidePostback(event.newValue);
    }

    public setDefaultGoal(): void {
        this.form.patchValue({
            is_default: this.form.get('is_default').value ? BooleanEnum.False : BooleanEnum.True
        });
    }

    public delete(): void {
        const content = this.translate.instant('delete.delete_confirm_text');
        this.modal3
            .confirm(content, {
                typeButton: 'delete'
            })
            .afterClosed$.pipe(
                switchMap((event) => {
                    if (event.type === Modal3CloseEventEnum.Confirm) {
                        return this.offerGoalUpsertService.destroy(this.offerId, this.editId).pipe(
                            tap(() => {
                                this.modal3EditFormRef.close(this.editId, Modal3CloseEventEnum.Delete);
                            })
                        );
                    }
                    return EMPTY;
                }),
                take(1)
            )
            .subscribe(
                () => {
                    this.toastr.successResponse('offers_page.goals.delete');
                },
                () => {
                    this.toastr.response(ToastrBarEventEnum.ExceptionDeleted, GOAL_TRANSLATE_KEY);
                }
            );
    }

    private showHidePostback(type: number): void {
        // console.log(type);
        const showEditPostback = [GoalTypeEnum.CPL, GoalTypeEnum.CPA, GoalTypeEnum.CPS];
        // this.goalIsNotCPS = true;

        if (!this.editId) {
            this.form.patchValue({
                tracking_method: TrackingMethodsEnum.Postback
            });
        }

        if (showEditPostback.includes(type)) {
            this.displayPostback = true;
            this.form.get('tracking_method').setValidators(Validators.required);
            this.form.get('tracking_method').enable();
        } else if (type === GoalTypeEnum.CPI) {
            this.displayPostback = true;
            this.form.patchValue({
                tracking_method: TrackingMethodsEnum.Postback
            });
            this.form.get('tracking_method').disable();
        } else if (type === GoalTypeEnum.CPC) {
            this.displayPostback = false;
            // this.goalIsNotCPS = false;
            this.form.patchValue({
                tracking_method: 0
            });
            this.form.get('tracking_method').clearValidators();
        }
    }

    private initForm(): void {
        let appendGroup = {};
        if (this.editId) {
            appendGroup = {
                payout_tiers: [],
                tier_silver: [],
                tier_gold: [],
                tier_platinum: [],
                caps: this.formBuilder.array([]),
                fire_affiliate_postback: BooleanEnum.False,
                unique_track_id: [],
                alias: ''
            };
        }

        this.form = this.formBuilder.group({
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            title: ['', Validators.required],
            type: [GoalTypeEnum.CPA, Validators.required],
            revenue: ['', Validators.required],
            payout: ['', Validators.required],
            is_private: [0],
            conversion_status: [2],
            multiple_conversions: [0],
            tracking_method: [TrackingMethodsEnum.Postback],
            payout_for_affiliate: '',
            is_default: BooleanEnum.False,
            ...appendGroup
        });
    }

    private loadFormData(): Observable<OfferGoalUpsertModel> {
        return this.offerGoalUpsertService.view(this.offerId, this.editId).pipe(
            tap((goal) => {
                if (goal) {
                    const { currency, tracking_domain, can_remove } = goal;
                    this.currency = currency;
                    this.trackingLink = tracking_domain;
                    this.canRemove = can_remove;
                    this.edit(goal);
                }
            })
        );
    }

    private init(): void {
        this.platformListsService
            .platformListsNew('goals_statuses,currencies,goals_types,tracking_methods,conversion_statuses,goal_tracking_methods')
            .pipe(
                map((lists) => {
                    lists.conversion_statuses = lists.conversion_statuses.filter(
                        (type: any) => type.id !== CONVERSION_STATUSES_ID.rejected
                    );

                    return lists;
                }),
                switchMap(() => this.offerGoalUpsertService.hasCpc(this.offerId)),
                tap((hasCpc: boolean) => {
                    this._hasCpc$.next(hasCpc);
                    this.hasCpc = hasCpc;
                }),
                switchMap(() => {
                    if (this.editId) {
                        this.disabledStatus = !this.showDefaultButton;
                        return this.loadFormData();
                    }
                    // this.showHidePostback(GoalTypesEnum.CPA);
                    return EMPTY;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(
                () => {
                    console.log('finish');
                },
                (error) => console.log(error),
                () => {
                    this.isLoad = true;
                }
            );
    }

    changeTrackingMethods(): void {
        if (this.editId) {
            this.trackingCode = this.converter.convertTrackingCode(this.getInputForConvertTrackingCode);
        }
    }

    private editGoalType(type: GoalTypeEnum): void {
        const editTypes = [GoalTypeEnum.CPA, GoalTypeEnum.CPL, GoalTypeEnum.CPI];

        this.disabledEditGoalType = !editTypes.includes(type);
    }

    private edit(goal: OfferGoalUpsertModel): void {
        if (!goal.is_default) {
            this.disabledStatus = false;
        }
        if (goal.status !== GoalStatusIdEnum.Active) {
            this.showDefaultButton = false;
        }

        this.form.patchValue(
            {
                ...goal,
                type: goal.type.id,
                tracking_method: goal.tracking_method.id
            },
            { emitEvent: true, onlySelf: false }
        );

        this.showHidePostback(goal.type.id);
        this.editGoalType(goal.type.id);
        this.caps = goal.caps;
        this.postbackToken = goal.postback_token;
        this.trackingCode = this.converter.convertTrackingCode(this.getInputForConvertTrackingCode);
    }

    private get getInputForConvertTrackingCode(): GoalConverterInput {
        const { tracking_method, type, alias, is_default } = this.form.getRawValue();
        return {
            trackingType: tracking_method,
            goalId: this.editId,
            typeGoal: type,
            trackingLink: this.trackingLink,
            alias,
            goalIsDefault: is_default,
            postbackToken: this.postbackToken
        };
    }

    private changeTypeWatcher(): void {
        this.goalIsNotCPC$ = this.form.get('type').valueChanges.pipe(
            startWith(''),
            debounceTime(0),
            map((): any => this.form.get('type').value),
            tap((type) => {
                this.showHidePostback(type);
            }),
            map((type) => type !== GoalTypeEnum.CPC),
            shareReplay()
        );
    }
}
