import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-spinner',
    template: `
        <div class="spinner2">
            <div class="spinner2__first"></div>
        </div>
    `,
    styleUrls: ['./ui-spinner.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class UiSpinnerComponent {}
