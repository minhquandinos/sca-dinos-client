import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'ui-status-dot',
    template: `
        <div class="d-flex align-items-center justify-content-center">
            <div
                *ngIf="color"
                [style.background]="color"
                [tooltip]="tooltip"
                [display]="hideTooltip || !!tooltip"
                class="ui-status-dot"
            ></div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiStatusDotComponent {
    @Input() color: string;

    @Input() tooltip: string;

    @Input() hideTooltip: boolean;
}
