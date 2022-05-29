import { Observable } from 'rxjs';

import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

export interface ReportFiltersSelectedDefaultSelectInterface {
    filter: ReportFilterFilterEnum;
    platformListProperty?: string;
    request?: (search?: string) => Observable<any>;
    replaceUnderscore?: boolean;
}
