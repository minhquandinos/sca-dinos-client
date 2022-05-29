import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';

import { animationRules } from '@scaleo/shared/animations';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ui-tooltip]',
    templateUrl: './ui-tooltip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [animationRules.fade()]
})
export class UiTooltipComponent {
    @HostBinding('class') hostClass = 'ui-tooltip';

    @Input() set text(value: string | TemplateRef<any>) {
        if (value) {
            if (value instanceof TemplateRef) {
                this.templateTextTpl = value;
            } else {
                this.simpleText = value;
            }
        }
    }

    templateTextTpl: TemplateRef<any>;

    simpleText: string;
}
