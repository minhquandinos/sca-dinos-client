import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

import { CustomFieldInterface, FieldTypeIdEnum } from '@scaleo/shared/data-access/custom-fields';

@Component({
    selector: 'app-custom-field',
    templateUrl: './custom-field.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CustomFieldComponent {
    @Input() formGroupName: string;

    @Input() customFieldsConfig: CustomFieldInterface[];

    public readonly fieldTypeIdEnum = FieldTypeIdEnum;
}
