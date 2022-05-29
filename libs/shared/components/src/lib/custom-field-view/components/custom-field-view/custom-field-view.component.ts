import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConfigCustomFieldService } from '@scaleo/shared/data-access/custom-fields';

import { CustomFieldViewModel } from '../../models/custom-field-view.model';

@Component({
    selector: 'app-custom-field-view',
    templateUrl: './custom-field-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfigCustomFieldService]
})
export class CustomFieldViewComponent {
    @Input() set customFields(value: CustomFieldViewModel) {
        const customFields = this.customFieldService.customFields(value);
        this._customFields = customFields ? customFields.filter((el) => el.value !== '') : [];
    }

    @Input() title: string;

    _customFields: CustomFieldViewModel<any>[];

    constructor(public customFieldService: ConfigCustomFieldService) {}

    trackByFn(index) {
        return index;
    }
}
