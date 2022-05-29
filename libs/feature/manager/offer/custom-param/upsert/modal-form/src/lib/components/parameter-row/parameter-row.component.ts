import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, shareReplay, startWith, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { GoalCapTypeEnum, GoalShortInterface } from '@scaleo/offer/common';
import { PlatformCurrencyService } from '@scaleo/platform/currency/service';
import { CustomParamsActionIdEnum, GoalTypeEnum } from '@scaleo/platform/list/access-data';
import { InputNumericType } from '@scaleo/shared/components';
import { CustomValidators } from '@scaleo/shared/validators';

@Component({
    selector: 'app-parameter-row',
    templateUrl: './parameter-row.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [UnsubscribeService]
})
export class ParameterRowComponent implements OnInit, AfterViewInit {
    @Input() group: FormGroup;

    @Input() index: number;

    @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

    readonly offerId = this.offerDetailQuery.id;

    readonly customParamsActionIdEnum = CustomParamsActionIdEnum;

    maxLengthForInput: number;

    formControlForParameter: 'money' | 'default' | 'percent' | 'percentWithDrop' = 'default';

    valueIsInteger: InputNumericType = undefined;

    showOffer: boolean;

    showGoals: boolean;

    parameterType$: Observable<CustomParamsActionIdEnum>;

    constructor(
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly cdr: ChangeDetectorRef,
        private readonly unsubscribe: UnsubscribeService,
        private readonly platformCurrencyService: PlatformCurrencyService
    ) {}

    ngOnInit(): void {
        this.init();
        this.parameterType$ = this.getParameterType$;
    }

    ngAfterViewInit(): void {
        this.showFormControlByParameterType();
        this.addValidationToControl();
    }

    delete(): void {
        this.deleted.emit();
    }

    changeType(event: any): void {
        if (event?.newValue) {
            this.group.get('parameter').reset();
            this.showFormControlByParameterType();
            this.addValidationToControl();
            this.showOfferComponent();
            this.showGoalsComponent();
        }
    }

    get parameterGoalId(): GoalShortInterface {
        return this.group.get('goal_id').value;
    }

    showFormControlByParameterType(): void {
        this.valueIsInteger = undefined;
        this.maxLengthForInput = undefined;

        switch (this.parameterType) {
            case CustomParamsActionIdEnum.Revenue:
            case CustomParamsActionIdEnum.Payout:
                this.setFormControlForGoalParameter(this.parameterGoalId.type);
                this.valueIsInteger = 'float';
                this.maxLengthForInput = 9;
                break;
            case CustomParamsActionIdEnum.ThrottleRatePending:
            case CustomParamsActionIdEnum.ThrottleRateRejected:
                this.formControlForParameter = 'percent';
                this.valueIsInteger = 'integer';
                this.maxLengthForInput = 3;
                break;
            case CustomParamsActionIdEnum.TrafficBackURL:
                this.setFormControlForGoalParameter(this.parameterGoalId.type);
                this.formControlForParameter = 'default';
                break;
            case CustomParamsActionIdEnum.ForceRedirect:
                break;
            case CustomParamsActionIdEnum.DailyCap:
            case CustomParamsActionIdEnum.WeeklyCap:
            case CustomParamsActionIdEnum.MonthlyCap:
            case CustomParamsActionIdEnum.TotalCap:
                this.setFormControlForCapTypeParameter(this.group.get('cap_type').value as number);
                this.valueIsInteger = 'integer';
                this.maxLengthForInput = 9;
                break;
            default:
                this.formControlForParameter = 'default';
                this.valueIsInteger = 'integer';
                break;
        }
    }

    addValidationToControl(): void {
        this.group.clearValidators();

        const noValidationFields = [
            CustomParamsActionIdEnum.ThrottleRatePending,
            CustomParamsActionIdEnum.ThrottleRateRejected,
            CustomParamsActionIdEnum.TrafficBackURL,
            CustomParamsActionIdEnum.TrafficBackOffer,
            CustomParamsActionIdEnum.ForceRedirect
        ];

        this.group.get('parameter').setValidators(Validators.required);

        if (this.parameterType && !noValidationFields.includes(this.parameterType)) {
            this.group.get('goal_id').setValidators(Validators.required);
        }

        if (this.parameterType && this.parameterType === CustomParamsActionIdEnum.TrafficBackURL) {
            this.group.get('parameter').setValidators([CustomValidators.checkUrl, Validators.required]);
        }

        if (
            [
                CustomParamsActionIdEnum.DailyCap,
                CustomParamsActionIdEnum.WeeklyCap,
                CustomParamsActionIdEnum.MonthlyCap,
                CustomParamsActionIdEnum.TotalCap
            ].includes(this.parameterType)
        ) {
            this.group.get('cap_type').setValidators(Validators.required);
        } else {
            this.group.get('cap_type').clearValidators();
            this.group.get('cap_type').updateValueAndValidity();
        }

        this.cdr.detectChanges();
    }

    setFormControlForCapTypeParameter(id: number): void {
        this.formControlForParameter = id === GoalCapTypeEnum.Budget ? 'money' : 'default';
    }

    get offerCurrencySymbol(): string {
        return this.platformCurrencyService.sign(this.offerDetailQuery.currency);
    }

    private get parameterType(): number {
        return this.group.get('type').value;
    }

    private changeGoalDetection(): void {
        this.group
            .get('goal_id')
            .valueChanges.pipe(debounceTime(100), takeUntil(this.unsubscribe))
            .subscribe((goal) => {
                if (goal) {
                    this.showFormControlByParameterType();
                }
            });
    }

    private setFormControlForGoalParameter(id: number): void {
        this.formControlForParameter = id === GoalTypeEnum.CPS ? 'percentWithDrop' : 'money';
    }

    private init(): void {
        this.changeGoalDetection();
        this.showOfferComponent();
        this.showGoalsComponent();
    }

    private showOfferComponent(): void {
        this.showOffer = [CustomParamsActionIdEnum.ForceRedirect, CustomParamsActionIdEnum.TrafficBackOffer].includes(this.parameterType);
    }

    private showGoalsComponent(): void {
        this.showGoals = ![CustomParamsActionIdEnum.TrafficBackURL, CustomParamsActionIdEnum.TrafficBackOffer].includes(this.parameterType);
        if (!this.showGoals) {
            this.group.get('goal_id').patchValue('');
            this.group.get('goal_id').clearValidators();
            this.group.get('goal_id').updateValueAndValidity();
        }
    }

    private get getParameterType$(): Observable<CustomParamsActionIdEnum> {
        const control = this.group.get('type');
        return control.valueChanges.pipe(startWith(control.value as CustomParamsActionIdEnum), shareReplay());
    }
}
