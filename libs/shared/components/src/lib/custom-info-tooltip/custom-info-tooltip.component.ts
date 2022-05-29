import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-custom-info-tooltip',
    template: `
        <ng-container *ngTemplateOutlet="customTemplate ? customTpl : defaultTpl"></ng-container>
        <ng-template #defaultTpl>
            <ui-svg-icon className="ml-1" [uiTooltip]="text" [size]="16" [icon]="icon"></ui-svg-icon>
        </ng-template>

        <ng-template #customTpl>
            <ng-template [ngTemplateOutlet]="customTemplate"></ng-template>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInfoTooltipComponent {
    @HostBinding('class') hostClass = 'd-inline-flex align-items-center';

    @Input() icon = 'info-4';

    @Input() text: string | TemplateRef<any>;

    @Input() customTemplate: TemplateRef<any>;
}
