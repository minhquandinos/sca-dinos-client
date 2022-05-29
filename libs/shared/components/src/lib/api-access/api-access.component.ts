import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiSvgIconComponent } from '@scaleo/ui-kit/elements';

import { ApiAccessStatusEnum } from './models/api-access.model';

@Component({
    selector: 'app-api-access',
    templateUrl: './api-access.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiAccessComponent {
    @Input() apiKey: string;

    @Input() apiLink: string;

    @Input() canRefreshApi = true;

    @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

    @Output() apiStatusChanged: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('refreshIcon') private readonly refreshIcon: UiSvgIconComponent;

    @HostBinding('class') hostClass = 'api-access d-flex flex-column';

    readonly apiAccessStatusEnum = ApiAccessStatusEnum;

    constructor(private translate: TranslateService, private modal3: Modal3Service, public parentForm: FormGroupDirective) {}

    refreshApi(): void {
        const modalRef$ = this.modal3.confirm(this.translate.instant('refresh_api_key_confirm.message'), {
            title: this.translate.instant('refresh_api_key_confirm.title'),
            actionLabel: this.translate.instant('interface.basic.continue'),
            typeButton: 'main'
        });
        modalRef$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                take(1)
            )
            .subscribe(() => {
                this.refreshIcon.startAnimation();
                this.refresh.emit();
            });
    }

    changeApiStatus(): void {
        this.apiStatusChanged.emit();
    }
}
