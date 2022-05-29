import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StatisticRowOsModel } from '../../../../../../../../../common/src/lib/model/reports.model';

const iconMap = {
    ic_os_apple: [82, 31, 76],
    ic_os_windows: [67, 68, 69, 70, 71, 72],
    ic_os_android: [2],
    ic_os_unix: [65, 27, 12, 17]
};

@Component({
    selector: 'app-report-field-insights-os',
    templateUrl: './report-field-insights-os.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldInsightsOsComponent {
    @Input() set data(value: StatisticRowOsModel) {
        if (value) {
            this.icon = Object.keys(iconMap).find((key) => iconMap[key].includes(+value?.type));
            this.setOsTooltip(ReportFieldInsightsOsComponent.prepareTooltip(value));
        }
    }

    icon = 'ic_os_other';

    private _tooltip$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    emptyTooltip$ = this.translate.stream('interface.basic.undefined');

    tooltip$ = this._tooltip$.pipe(switchMap((tooltip) => (tooltip ? of(tooltip) : this.emptyTooltip$)));

    constructor(private translate: TranslateService) {}

    private static prepareTooltip(os: StatisticRowOsModel): string {
        if (os?.value) {
            const osName = (os.value as string).replace('Mac', 'MacOS').replace('Mac OS X', 'MacOS X');

            return `${osName} ${os?.version}`;
        }

        return null;
    }

    setOsTooltip(value: string) {
        this._tooltip$.next(value);
    }
}
