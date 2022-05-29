import { Component, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({ template: '' })
export abstract class BaseAffiliatePostbackWidgetComponent {
    abstract columns: UiSimpleTableHeaderModel[];

    protected constructor(protected readonly modal3Service: Modal3Service, protected readonly translate: TranslateService) {}

    abstract openModal(editId?: number): void;

    showPostbackCode(template: TemplateRef<HTMLElement>): void {
        this.modal3Service.info(template, {
            title: this.translate.instant('table.column.postback')
        });
    }
}
