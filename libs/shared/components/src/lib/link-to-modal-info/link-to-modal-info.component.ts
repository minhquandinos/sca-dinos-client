import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-link-to-modal-info',
    template: ` <ui-button-link [label]="linkLabel" (toggle)="showInfo()" type="link-static"></ui-button-link> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkToModalInfoComponent {
    @Input() linkLabel: string;

    @Input() content: TemplateRef<HTMLElement> | string;

    @Input() modalTitle: string;

    constructor(private readonly modal3: Modal3Service) {}

    showInfo(): void {
        this.modal3.info(this.content, {
            title: this.modalTitle
        });
    }
}
