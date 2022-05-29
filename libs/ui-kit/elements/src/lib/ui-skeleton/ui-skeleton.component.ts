import { Component, Input } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';

@Component({
    selector: 'ui-skeleton',
    templateUrl: './ui-skeleton.component.html',
    styleUrls: ['./ui-skeleton.component.css']
})
export class UiSkeletonComponent {
    @Input() styleName: BaseObjectModel;

    @Input() className: string;
}
