import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { CONVERSION_STATUS_COLOR_MAP, CONVERSION_STATUSES_ID, PlatformConversionStatusValueType } from '@scaleo/platform/list/access-data';

interface ItemConversionStatus {
    id: number;
    colorText: string;
    bgColor: string;
}

@Component({
    selector: 'app-conversion-status',
    templateUrl: './conversion-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionStatusComponent {
    @Input() set conversionStatus(status: PlatformConversionStatusValueType) {
        if (status) {
            this.setConversionStatus(status);
        }
    }

    @Input() showConversionStatusLabel = true;

    @Input() set label(label: string) {
        if (label) {
            this._label$.next(label);
        }
    }

    private _status$: BehaviorSubject<ItemConversionStatus> = new BehaviorSubject<ItemConversionStatus>(undefined);

    readonly status$ = this._status$.asObservable();

    private _label$ = new BehaviorSubject<string>('table.column.conversion_status');

    readonly label$ = this._label$.asObservable().pipe(switchMap((key) => (key ? this.translate.stream(key) : EMPTY)));

    constructor(private readonly translate: TranslateService) {}

    private setConversionStatus(status: PlatformConversionStatusValueType): void {
        const bgColorMap: BaseObjectModel = {
            [CONVERSION_STATUSES_ID.approved]: 'green3',
            [CONVERSION_STATUSES_ID.pending]: 'conversion_pending',
            [CONVERSION_STATUSES_ID.rejected]: 'conversion_rejected',
            [CONVERSION_STATUSES_ID.trash]: 'conversion_rejected'
        };

        const textColor = CONVERSION_STATUS_COLOR_MAP?.[status];
        const bgColor = bgColorMap?.[status];

        if (textColor && bgColor) {
            this._status$.next({
                id: status,
                colorText: textColor,
                bgColor: bgColor
            });
        }
    }
}
