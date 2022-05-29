import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-detail-info-widget-content',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoWidgetContentComponent {
    @ViewChild(TemplateRef, { static: true })
    readonly template: TemplateRef<any>;
}
