import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { availableMacros } from './available-macros.const';
import { AvailableMacrosType } from './available-macros.type';

@Component({
    selector: 'manager-shared-available-macros',
    templateUrl: './available-macros.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailableMacrosComponent implements OnInit {
    @Input() typeMacroses: AvailableMacrosType = 'url';

    @Input() className: string;

    @Input() isMacroses = true;

    @Input() trackingLink: string;

    @Input() showDescription = true;

    jsonKey = 'macros_available.';

    mapMacroses: string[] = [];

    exampleUrls: string[] = [];

    @ViewChild('infoTemplate') infoTemplate: TemplateRef<HTMLElement>;

    constructor(private translate: TranslateService, private modal3: Modal3Service) {}

    ngOnInit(): void {
        switch (this.typeMacroses) {
            case 'goals':
            case 'tracking-goals':
                this.jsonKey = 'macros_available_goals.';
                break;
            case 'postback':
                this.jsonKey = 'macros_available_postbacks.';
                break;
            case 'global_trafficback':
                this.jsonKey = 'macros_available_global_trafficback.';
                break;
            case 'announcement':
                this.jsonKey = 'macros_available_announcement.';
                break;
            case 'email_template':
                this.jsonKey = 'macros_available_email_template.';
                break;
            case 'posting_instructions':
                this.jsonKey = 'leads_ui_page.deliver.deliveries.macros_available.';
                break;
            default:
                this.jsonKey = 'macros_available.';
                break;
        }
        this.setTypeMacroses();
    }

    setTypeMacroses() {
        this.mapMacroses = availableMacros.setMacroses(this.typeMacroses);
        this.exampleUrls = availableMacros.setUrl(this.typeMacroses, this.trackingLink);
    }

    public showInfo() {
        this.modal3.info(this.infoTemplate, {
            title: this.translate.instant(`${this.jsonKey}title`)
        });
    }
}
