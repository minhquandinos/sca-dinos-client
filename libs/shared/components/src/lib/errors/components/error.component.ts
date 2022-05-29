import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-error',
    template: `
        <div class="errors-list color__red text-size-13 line-height-14" *ngIf="error">
            {{ error }}
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
    @HostBinding('class') className = 'd-block';

    @Input()
    error: string;
}
