import { TemplateRef } from '@angular/core';

import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

export interface ReportReferralListTableConfigModel {
    headers: UiTable2ColumnsModel[];
    rowsTemplate: ReadonlyMap<string, TemplateRef<any>>;
}
