import { Injectable } from '@angular/core';

import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

import { ReportFiltersSelectedDefaultSelectInterface } from './models/report-filters-selected-default-select.model';

@Injectable()
export class ReportFiltersSelectedDefaultSelectService {
    readonly filterConfigForReportFiltersDefaultSelect: ReportFiltersSelectedDefaultSelectInterface[] = [
        {
            filter: ReportFilterFilterEnum.Currency,
            platformListProperty: 'currencies'
        },
        {
            filter: ReportFilterFilterEnum.Reason,
            platformListProperty: 'redirects_reasons'
        },
        {
            filter: ReportFilterFilterEnum.Redirection,
            platformListProperty: 'forwarding_types'
        },
        // {
        //     filter: ReportFilterFilterEnum.ConversionStatus,
        //     platformListProperty: 'conversion_statuses',
        //     replaceUnderscore: true
        // },
        {
            filter: ReportFilterFilterEnum.GoalType,
            platformListProperty: 'goals_types'
        },
        {
            filter: ReportFilterFilterEnum.ConnectionType,
            platformListProperty: 'connection_types'
        },
        {
            filter: ReportFilterFilterEnum.DeviceType,
            platformListProperty: 'device_types'
        }
    ];

    public getComponentForReportFiltersDefaultSelect(filter: ReportFilterFilterEnum): ReportFiltersSelectedDefaultSelectInterface {
        return this.filterConfigForReportFiltersDefaultSelect.find(
            (comp: ReportFiltersSelectedDefaultSelectInterface) => comp.filter === filter
        );
    }
}
