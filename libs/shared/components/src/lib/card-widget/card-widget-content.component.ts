import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-card-widget-content',
    template: `
        <ng-template>
            <ui-page-wrapper-content [className]="className">
                <ng-content></ng-content>
            </ui-page-wrapper-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardWidgetContentComponent {
    @Input() className = 'pt-0';

    @ViewChild(TemplateRef, { static: true })
    template: TemplateRef<any>;
}
