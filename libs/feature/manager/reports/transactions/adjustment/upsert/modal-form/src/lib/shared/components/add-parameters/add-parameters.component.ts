import { AfterViewInit, ChangeDetectorRef, Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroupDirective } from '@angular/forms';

import { ManagerAdjustmentUpsertConditionsModel } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/data-access';
import { PlatformListsFormatAdjustmentConditionsInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { ValidationMethods } from '@scaleo/shared/validators';

import { AddFieldClass } from '../../class/add-field.class';

@Component({
    selector: 'app-add-parameters',
    templateUrl: './add-parameters.component.html',
    providers: [AddFieldClass],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class AddParametersComponent implements AfterViewInit {
    @Input() title: string;

    @Input() set platformParams(param: PlatformListsFormatAdjustmentConditionsInterface[]) {
        param = param.map((item) => {
            item.title = item.id;
            return item;
        });
        this.allParams = param;
        this.selectedParams = this.allParams;
        this.cdr.detectChanges();
    }

    @Input() set haveCPSGaol(have: boolean) {
        if (have) {
            this.selectedParams = [...this.selectedParams.filter((item) => item.id !== 'amount')];
            this.allParams = [...this.allParams.filter((item) => item.id !== 'amount')];
            if (this.parentForm.form) {
                this.delete(
                    (this.parentForm.form.get('parameters') as FormArray).value.findIndex(
                        (item: ManagerAdjustmentUpsertConditionsModel) => item.key === 'amount'
                    )
                );
            }
        } else if (
            have === false &&
            !(this.allParams.find((item) => item.id === 'amount') && this.selectedParams.find((item) => item.id === 'amount'))
        ) {
            const amount = { id: 'amount', title: 'Amount' };
            this.allParams.push(amount);
            this.selectedParams.push(amount);
            this.selectedParams = [...new Set(this.selectedParams)];
            this.allParams = [...new Set(this.allParams)];
            this.deleteSelectedItems();
        }
        this.cdr.detectChanges();
    }

    public items: any[];

    allParams: PlatformListsFormatAdjustmentConditionsInterface[];

    selectedParams: PlatformListsFormatAdjustmentConditionsInterface[] = [];

    public readonly parentFormDisabled: boolean = this.parentForm.form.disabled;

    constructor(
        public parentForm: FormGroupDirective,
        private formBuilder: FormBuilder,
        private platformListsService: PlatformListsService,
        private validation: ValidationMethods,
        private cdr: ChangeDetectorRef,
        private addFieldClass: AddFieldClass
    ) {}

    ngAfterViewInit(): void {
        this.deleteSelectedItems();
    }

    public addField(item?: ManagerAdjustmentUpsertConditionsModel): any {
        const field = item || { key: this.selectedParams[0]?.id };
        return this.addFieldClass.addField(field);
    }

    public delete(index: number): void {
        if (!this.parentForm.disabled && index !== -1) {
            (this.parentForm.form.get('parameters') as FormArray).removeAt(index);
            this.deleteSelectedItems();
        }
    }

    public add(): void {
        (this.parentForm.form.get('parameters') as FormArray).push(this.addField());
        this.deleteSelectedItems();
    }

    public get paramsArray(): FormArray {
        return this.parentForm.form.get('parameters') as FormArray;
    }

    changeParams(event: any, index: number): void {
        const field: ManagerAdjustmentUpsertConditionsModel = {
            key: event.newValue,
            value: ''
        };

        this.delete(index);
        (this.parentForm.form.get('parameters') as FormArray).insert(index, this.addField(field));
        this.deleteSelectedItems();
    }

    deleteSelectedItems(): void {
        setTimeout(() => {
            this.selectedParams = this.allParams;
            (this.parentForm.form.get('parameters') as FormArray).value.map((item: any) => {
                this.selectedParams = [...this.selectedParams.filter((c) => c.id !== item.key)];
            });
        });
    }
}
