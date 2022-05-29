import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'scaleo-link-builder-add-sub-id',
    templateUrl: './link-builder-add-sub-id.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class LinkBuilderAddSubIdComponent implements OnInit {
    @Input() formArrayName: string;

    @Input() set isAffiliate(value: boolean) {
        if (value) {
            this.translateSchema = 'offers_page.tracking.form.link_builder.affiliate.';
        }
    }

    translateSchema = 'table.column.';

    arrayParams: string[] = [
        'sub_id1',
        'sub_id2',
        'sub_id3',
        'sub_id4',
        'sub_id5',
        'aff_param1',
        'aff_param2',
        'aff_param3',
        'aff_param4',
        'aff_param5'
    ];

    constructor(private formBuilder: FormBuilder, public parentForm: FormGroupDirective) {}

    ngOnInit(): void {
        this.add();
        this.add();
    }

    add() {
        const subIDsArray = this.parentForm.form.get('sub_ids') as FormArray;
        const subID = this.formBuilder.group({
            key: this.arrayParams[subIDsArray.length],
            value: null
        });
        subIDsArray.push(subID);
    }

    public get subIdArray(): FormArray {
        return this.parentForm.form.get('sub_ids') as FormArray;
    }
}
