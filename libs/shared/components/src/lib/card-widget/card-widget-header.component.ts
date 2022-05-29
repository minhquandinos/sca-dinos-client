import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { UiPageWrapperHeaderSizeType } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-card-widget-header',
    template: `
        <ng-template>
            <ui-page-wrapper-header [haveBorderBottom]="divider" [className]="className" [size]="size">
                <ng-content></ng-content>
            </ui-page-wrapper-header>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardWidgetHeaderComponent {
    @Input() divider = false;

    @Input() className;

    @Input() size: UiPageWrapperHeaderSizeType = 'large';

    @ViewChild(TemplateRef, { static: true })
    template: TemplateRef<any>;
}
