import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { UiPageWrapperFooterBorderTopEnum, UiPageWrapperFooterSizeType } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-card-widget-footer',
    template: `
        <ng-template>
            <ui-page-wrapper-footer [className]="className" [borderTop]="divider" [size]="size">
                <ng-content></ng-content>
            </ui-page-wrapper-footer>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardWidgetFooterComponent {
    @Input() divider: keyof Record<UiPageWrapperFooterBorderTopEnum, string> | string = 'none';

    @Input() className: string;

    @Input() size: UiPageWrapperFooterSizeType = 'small';

    @ViewChild(TemplateRef, { static: true })
    template: TemplateRef<any>;
}
