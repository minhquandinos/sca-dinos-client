import { Component, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';

import { LeadsReceiveCampaignFieldModel } from '@scaleo/feature/manager/leads/receive/common';

import { CampaignFieldValidationsService } from './campaign-field-validations.service';

@Component({
    selector: 'app-campaign-field-validations',
    templateUrl: './campaign-field-validations.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class CampaignFieldValidationsComponent implements OnInit {
    public campaignFields$: Observable<LeadsReceiveCampaignFieldModel[]>;

    constructor(private parentForm: FormGroupDirective, private campaignFieldValidationsService: CampaignFieldValidationsService) {}

    ngOnInit(): void {
        this.campaignFields$ = this.getCampaignFields$;
    }

    private get validationsFormArray(): FormArray {
        return this.parentForm.form.get('validations') as FormArray;
    }

    get validationsFormControlsArray(): AbstractControl[] {
        return this.validationsFormArray.controls;
    }

    public add() {
        this.validationsFormArray.push(this.addField());
    }

    private addField(): FormGroup {
        return this.campaignFieldValidationsService.addValidation(null);
    }

    // TODO refactor this code
    private get getCampaignFields$(): Observable<LeadsReceiveCampaignFieldModel[]> {
        return this.parentForm.form.get('fields').valueChanges.pipe(
            startWith(''),
            switchMap(() => of(this.parentForm.form.get('fields').value)),
            distinctUntilChanged((a, b) => JSON.stringify(this.getFieldsName(a)) === JSON.stringify(this.getFieldsName(b))),
            tap((fields: LeadsReceiveCampaignFieldModel[]) => this.removeValidationsFromDeletedFields(fields)),
            map((fields: LeadsReceiveCampaignFieldModel[]) =>
                fields
                    .filter((field) => field.name)
                    .map((field) => ({
                        ...field,
                        title: field.name
                    }))
            )
        );
    }

    // TODO remove this code
    // TODO in component CampaignFieldValidationComponent add code
    // TODO changeFields(): void { this.group.updateValueAndValidity();}
    // TODO add event to app-select (change)="changeFields()"
    private removeValidationsFromDeletedFields(fields: LeadsReceiveCampaignFieldModel[]): void {
        const fieldsName = this.getFieldsName(fields);
        const validationsForDeletedFields = this.validationsFormControlsArray
            .filter((field) => field.value.name)
            .filter((field) => !fieldsName.includes(field.value.name));
        validationsForDeletedFields.forEach((validation) => {
            const index = this.validationsFormControlsArray.indexOf(validation);
            this.validationsFormArray.removeAt(index);
        });
    }

    private getFieldsName(fields: LeadsReceiveCampaignFieldModel[]): string[] {
        return fields.map((field) => field.name).filter((fieldName) => fieldName);
    }
}
