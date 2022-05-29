import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { UiImageRoundingType } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-detail-info-widget-header',
    template: `
        <ng-template>
            <div class="d-flex w-100">
                <ui-image [image]="image" [type]="imageType" [height]="80" [width]="80"></ui-image>

                <div class="ml-3 text-break">
                    <div class="title is-4 mr-2 m-t-6 line-height is-19">{{ title }}</div>
                    <ng-content select="[titleContent]"></ng-content>
                </div>

                <div class="d-flex ml-auto ml-3">
                    <ng-content select="[controlContent]"></ng-content>
                </div>
            </div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailInfoWidgetHeaderComponent {
    @Input() image: string;

    @Input() imageType: UiImageRoundingType = 'circle';

    @Input() title: string;

    @ViewChild(TemplateRef, { static: true })
    readonly template: TemplateRef<any>;
}
