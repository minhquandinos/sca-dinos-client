import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { ScaleoStatusesType } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-status-dot-color',
    template: `
        <ui-status-dot
            *ngIf="type"
            [color]="status | statusColor: type"
            [tooltip]="status | statusLabel: type | async"
            [hideTooltip]="!hideTooltip"
        ></ui-status-dot>
        <span class="ml-2 text-nowrap w-auto" *ngIf="showLabel">
            {{ status | statusLabel: type | async }}
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusDotColorComponent {
    @HostBinding('class') hostClass = 'status-dot-color d-flex align-items-center';

    @Input() type: ScaleoStatusesType | keyof Record<ScaleoStatusesType, string>;

    @Input() status: number | string;

    @Input() hideTooltip: boolean;

    @Input() showLabel: boolean;
}
