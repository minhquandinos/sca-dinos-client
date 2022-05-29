import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-report-info',
    template: `
        <span class="report-header-helper" [ngClass]="className">
            <ng-content></ng-content>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportInfoComponent {
    @Input() className: string;
}
