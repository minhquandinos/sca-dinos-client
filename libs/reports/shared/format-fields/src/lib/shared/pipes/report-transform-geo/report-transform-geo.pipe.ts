import { Pipe, PipeTransform } from '@angular/core';

import { StatisticRowGeoModel } from '@scaleo/reports/common';

@Pipe({
    name: 'transformGeo'
})
export class ReportTransformGeoPipe implements PipeTransform {
    transform(value: StatisticRowGeoModel): string {
        const country = value?.country ? value?.country : '';
        const region = value?.region ? `, ${value?.region}` : '';
        const city = value?.city ? `, ${value?.city}` : '';
        return country + region + city;
    }
}
