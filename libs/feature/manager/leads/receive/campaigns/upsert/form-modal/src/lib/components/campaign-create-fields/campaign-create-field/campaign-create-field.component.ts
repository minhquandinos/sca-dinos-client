import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PlatformListsFormatModel } from '@scaleo/platform/list/access-data';
import { SelectChangeModel } from '@scaleo/shared/components/select';

@Component({
    selector: 'app-campaign-create-field',
    templateUrl: './campaign-create-field.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class CampaignCreateFieldComponent implements OnInit {
    @Input() fields: PlatformListsFormatModel[];

    @Input() group: FormGroup;

    @Input() index: number;

    public currentFieldName: string;

    public readonly exceptedIds$ = this.getExceptedIds$;

    constructor(private parentForm: FormGroupDirective) {}

    public ngOnInit(): void {
        this.currentFieldName = this.group.getRawValue().name;
    }

    get fieldsFormArray(): FormArray {
        return this.parentForm.form.get('fields') as FormArray;
    }

    public delete() {
        const index = this.fieldsFormArray.controls.indexOf(this.group);
        this.fieldsFormArray.removeAt(index);
        // this.setSelectedFields();
    }

    public changeType(event: SelectChangeModel) {
        this.currentFieldName = event.newValue;
    }

    private get getExceptedIds$(): Observable<string[]> {
        return this.parentForm.form.valueChanges.pipe(
            startWith(this.parentForm.form.value as unknown),
            map((form) =>
                form?.fields
                    ? form.fields
                          .map((elem: PlatformListsFormatModel) => elem.name)
                          .filter((name: string) => name !== this.currentFieldName)
                    : []
            )
        );
    }
}
