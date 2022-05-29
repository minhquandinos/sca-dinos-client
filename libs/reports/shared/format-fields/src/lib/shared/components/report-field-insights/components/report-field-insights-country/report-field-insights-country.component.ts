import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StatisticRowGeoModel } from '../../../../../../../../../common/src/lib/model/reports.model';
import { ReportTransformGeoPipe } from '../../../../pipes/report-transform-geo/report-transform-geo.pipe';

@Component({
    selector: 'app-report-field-insights-country',
    templateUrl: './report-field-insights-country.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReportTransformGeoPipe]
})
export class ReportFieldInsightsCountryComponent {
    @Input() set data(value: StatisticRowGeoModel) {
        if (value) {
            this.countryCode = value?.country_code;
            this.setTooltip(this.initTooltip(value));
        }
    }

    countryCode: string;

    private _tooltip$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    emptyTooltip$ = this.translate.stream('interface.basic.undefined');

    tooltip$ = this._tooltip$.pipe(switchMap((tooltip) => (tooltip ? of(tooltip) : this.emptyTooltip$)));

    constructor(private transformGeo: ReportTransformGeoPipe, private translate: TranslateService) {}

    private setTooltip(value: string): void {
        this._tooltip$.next(value);
    }

    private initTooltip(value: StatisticRowGeoModel): string {
        return this.transformGeo.transform(value);
    }
}
