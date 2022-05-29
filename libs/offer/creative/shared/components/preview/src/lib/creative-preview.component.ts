import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-creative-preview',
    templateUrl: './creative-preview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreativePreviewComponent implements OnChanges {
    @Input() creative: any; // TODO refactor OfferCreativeInterface | ManagerOfferCreativeModel

    previewTpl: TemplateRef<HTMLElement>;

    @ViewChild('bannerTpl', { static: true })
    private readonly bannerTpl: TemplateRef<HTMLElement>;

    @ViewChild('xmlTpl', { static: true })
    private readonly xmlTpl: TemplateRef<HTMLElement>;

    @ViewChild('defaultTpl', { static: true })
    private readonly defaultTpl: TemplateRef<HTMLElement>;

    constructor(private readonly translate: TranslateService, private readonly modal3: Modal3Service) {}

    ngOnChanges(changes: SimpleChanges) {
        const { creative } = changes;
        if (creative) {
            this.setPreviewTpl();
        }
    }

    showInfo(): void {
        this.modal3.info(this.previewTpl, {
            title: this.translate.instant('table.column.preview')
        });
    }

    private setPreviewTpl(): void {
        const { type } = this.creative;
        const creativeType = typeof type === 'number' ? type : type.id;

        const tplMap: BaseObjectModel = {
            [CreativeTypesIdEnum.Banner]: this.bannerTpl,
            [CreativeTypesIdEnum.XMLFeed]: this.xmlTpl
        };

        this.previewTpl = tplMap[creativeType] || this.defaultTpl;
    }
}
