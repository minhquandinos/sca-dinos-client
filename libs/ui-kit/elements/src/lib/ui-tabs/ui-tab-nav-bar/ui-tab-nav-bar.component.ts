import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'ui-tab-nav-bar',
    template: `
        <div class="ui-tabs ui-tabs--nav-bar h-100" [ngClass]="className">
            <div class="ui-tabs__header h-100">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTabNavBarComponent {
    @HostBinding('class') hostClass = 'd-block w-100';

    @Input() className: string;
}
