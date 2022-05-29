import { ChangeDetectionStrategy, Component, HostBinding, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ActivityActionEnum } from '@scaleo/activity-log/common';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { BaseActivityComponent } from '../base-activity.component';

@Component({
    selector: 'scaleo-manager-activity',
    templateUrl: './manager-activity.component.html',
    styleUrls: ['./manager-activity.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerActivityComponent extends BaseActivityComponent implements OnInit {
    @HostBinding('class')
    hostClass = 'manager-activity';

    @ViewChild('valuesTemplate')
    valuesTemplate: TemplateRef<HTMLElement>;

    readonly activityActionEnum = ActivityActionEnum;

    constructor(private translate: TranslateService, private modal3Service: Modal3Service) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    public showInfo() {
        this.modal3Service.info(this.valuesTemplate, {
            title: this.translate.instant('activity_logs.details'),
            wrapperClassName: `modal--config activity-log-modal`
        });
    }
}
