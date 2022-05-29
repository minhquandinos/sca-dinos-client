import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ManagerAdjustmentUpsertConditionsModel } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/data-access';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { maxCountRecordPerLine } from '@scaleo/shared/validators';

@Injectable()
export class AddFieldClass {
    constructor(private formBuilder: FormBuilder, private customDateRangeService: CustomDateRangeService) {}

    public addField(field?: ManagerAdjustmentUpsertConditionsModel) {
        switch (field?.key) {
            case 'dates_range':
                return this.formBuilder.group({
                    key: ['dates_range'],
                    dates_range: this.formBuilder.group({
                        from: [field?.dates_range?.from ? field.dates_range.from : this.customDateRangeService.rangeFrom],
                        to: [field?.dates_range?.to ? field.dates_range.to : this.customDateRangeService.rangeTo]
                    })
                });
            case 'offer':
                return this.formBuilder.group({
                    key: ['offer'],
                    offer: [field && (field as any)?.['offer'] ? (field as any)?.['offer'] : null]
                });
            case 'goal':
                return this.formBuilder.group({
                    key: ['goal'],
                    goal: [field && (field as any)?.['goal'] ? (field as any)?.['goal'] : '']
                });
            case 'conversion_status':
                return this.formBuilder.group({
                    key: [field?.key],
                    [field?.key]: [field && field.key && (field as any)?.[field.key] ? (field as any)?.[field.key] : 2, Validators.required]
                });
            case 'transactions_ids':
            case 'transactions_ips':
            case 'click_ids':
            case 'track_ids':
                return this.formBuilder.group({
                    key: [field?.key],
                    [field?.key]: [
                        field && field.key ? (field as any)?.[field.key] : '',
                        [Validators.required, maxCountRecordPerLine(1000)]
                    ]
                });
            default:
                return this.formBuilder.group({
                    key: [field && field.key ? field.key : '', Validators.required],
                    value: [field && field.value ? field.value : '', Validators.required]
                });
        }
    }
}
