import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';

import { ManagerAdjustmentUpsertConditionsModel } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { PlatformListsFormatAdjustmentConditionsInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { ValidationMethods } from '@scaleo/shared/validators';

import { AddFieldClass } from '../../class/add-field.class';

@Component({
    selector: 'app-add-conditions',
    templateUrl: './add-conditions.component.html',
    providers: [AddFieldClass],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class AddConditionsComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() title: string;

    @Input() formArrayName: string;

    @Input() description: string;

    @Input() set platformConditions([conds, id]: [PlatformListsFormatAdjustmentConditionsInterface[], number]) {
        this.allConditions = conds.filter((item) => item.id !== 'dates_range').filter((item) => item.id !== 'goal');
        if (id === 2) {
            this.allConditions = this.allConditions.filter((item) => item.id !== 'offer');
        }
        this.selectedConditions = this.allConditions;
    }

    selectedOfferId = 0;

    conditionArrayIds: any[];

    allConditions: PlatformListsFormatAdjustmentConditionsInterface[];

    selectedConditions: PlatformListsFormatAdjustmentConditionsInterface[];

    public readonly parentFormDisabled: boolean = this.parentForm.form.disabled;

    private unsubscribe: Subject<void> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private platformListsService: PlatformListsService,
        private validation: ValidationMethods,
        private customDateRangeService: CustomDateRangeService,
        private addFieldClass: AddFieldClass,
        public parentForm: FormGroupDirective
    ) {}

    ngOnInit(): void {
        this.setConditionsList();
    }

    ngAfterViewInit(): void {
        const offerId = this.parentForm.form.get('details').get('offer')?.value.id;
        this.selectedOfferId = offerId !== undefined ? offerId : 0;
        this.deleteSelectedItems();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public delete(index: number, keyName?: string): void {
        if (!this.parentForm.disabled) {
            (this.parentForm.form.get('conditions') as FormArray).removeAt(index);
            if (keyName === 'offer') {
                (this.parentForm.form.get('conditions') as FormArray).removeAt(index);
            }
            this.deleteSelectedItems();
        }
    }

    public add(): void {
        const field = {
            key: this.selectedConditions[0].id
        };
        (this.parentForm.form.get('conditions') as FormArray).push(this.addFieldClass.addField(field));
        this.addGoalField(field.key);
        this.deleteSelectedItems();
    }

    public get conditionsArray(): FormArray {
        return this.parentForm.form.get('conditions') as FormArray;
    }

    dateWasChange(date: CustomDateRangeModel): void {
        const [first] = this.parentForm.form.value.conditions;
        this.parentForm.form.get('conditions').patchValue([
            {
                ...first,
                dates_range: {
                    from: date.rangeFrom,
                    to: date.rangeTo
                }
            }
        ]);
    }

    changeCond(event: any, index: number): void {
        const field: ManagerAdjustmentUpsertConditionsModel = {
            key: event.newValue,
            value: ''
        };

        const indexOffer = (this.parentForm.form.get('conditions') as FormArray).value.findIndex(
            (item: ManagerAdjustmentUpsertConditionsModel) => item.key === 'offer'
        );
        const indexGoal = (this.parentForm.form.get('conditions') as FormArray).value.findIndex(
            (item: ManagerAdjustmentUpsertConditionsModel) => item.key === 'goal'
        );

        if (indexOffer === -1 && indexGoal !== -1) {
            this.delete(indexGoal);
        }

        this.delete(index);
        (this.parentForm.form.get('conditions') as FormArray).insert(index, this.addFieldClass.addField(field));
        this.addGoalField(field.key, index);
        this.deleteSelectedItems();
    }

    setConditionsList(): void {
        this.conditionArrayIds = this.allConditions.map((cond) => cond.id);
    }

    public selectedOffer(offer: any, index: number): void {
        if (offer.newValue) {
            this.selectedOfferId = offer.newValue.id;
            const goal = (this.parentForm.form.get('conditions') as FormArray).controls[index + 1];
            goal.patchValue({
                goal: {
                    id: 0,
                    title: 'None'
                }
            });
        }
    }

    deleteSelectedItems(): void {
        setTimeout(() => {
            this.selectedConditions = this.allConditions;
            (this.parentForm.form.get('conditions') as FormArray).value.forEach((item: any) => {
                this.selectedConditions = [...this.selectedConditions.filter((c) => c.id !== item.key)];
            });
        });
    }

    addGoalField(key: string, index?: number): void {
        if (key === 'offer') {
            const fieldForGoal = {
                key: 'goal'
            };
            if (index) {
                (this.parentForm.form.get('conditions') as FormArray).insert(index + 1, this.addFieldClass.addField(fieldForGoal));
            } else {
                (this.parentForm.form.get('conditions') as FormArray).push(this.addFieldClass.addField(fieldForGoal));
            }
        }
    }
}
