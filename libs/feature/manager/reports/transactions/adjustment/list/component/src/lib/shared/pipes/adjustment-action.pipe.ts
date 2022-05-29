import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'adjustmentAction'
})
export class AdjustmentActionPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1:
                return 'reports_page.adjustments.action.change_status';
            case 2:
                return 'reports_page.adjustments.action.change_payouts';
            case 3:
                return 'reports_page.adjustments.action.insert_conversions';
            case 4:
                return 'reports_page.adjustments.action.insert_conversions_via_csv';
            default:
                return undefined;
        }
    }
}
