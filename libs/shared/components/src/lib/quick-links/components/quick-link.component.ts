import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Params } from '@angular/router';

import { FunctionType } from '@scaleo/core/data';

import { QuickLinksIconEnum } from '../enums/quick-links.enum';

@Component({
    selector: 'app-quick-link',
    template: ` <ui-button-link [icon]="icon" type="floating" [label]="label | translate" (toggle)="toLink()"></ui-button-link> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickLinkComponent {
    @Input() icon: keyof Record<QuickLinksIconEnum, string> | string;

    @Input() label: string;

    @Input() link: FunctionType;

    @Input() queryParams: Params = {};

    toLink() {
        this.link();
    }
}
