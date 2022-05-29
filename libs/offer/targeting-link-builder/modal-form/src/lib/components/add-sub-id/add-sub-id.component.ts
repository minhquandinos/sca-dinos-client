import { Component, Input, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-add-sub-id',
    templateUrl: './add-sub-id.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class AddSubIdComponent implements OnInit, OnDestroy {
    @Input() formArrayName: string;

    @Input()
    isAffiliate!: boolean;

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

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(private formBuilder: FormBuilder, public parentForm: FormGroupDirective) {}

    ngOnInit(): void {
        this.add();
        this.add();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
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
