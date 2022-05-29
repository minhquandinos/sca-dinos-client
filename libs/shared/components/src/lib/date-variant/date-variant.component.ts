import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { startWith, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { DateFormatService } from '@scaleo/platform/format/service';

@Component({
    selector: 'app-date-variant',
    templateUrl: './date-variant.component.html',
    styleUrls: ['./date-variant.component.css'],
    providers: [UnsubscribeService]
})
export class DateVariantComponent implements OnInit {
    @HostBinding('class') hostClass = 'date-variant';

    @HostBinding('class.color__green') colorGreen = false;

    @Input() date: number;

    @Input() showTime = false;

    @Input() changeColor = true;

    @Input() staticColor: string;

    public renderDate: any;

    public renderTime: string;

    public colorClass = '';

    public today: string;

    public tooltipDate: string;

    constructor(
        private translate: TranslateService,
        private dateFormatService: DateFormatService,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.translate.onLangChange.pipe(startWith(''), takeUntil(this.unsubscribe)).subscribe(() => {
            this.prepareDate();
        });
    }

    private prepareDate(): void {
        if (this.date === 0) {
            this.renderDate = this.translate.instant('interface.basic.n_a');
            return;
        }

        const date = this.dateFormatService.format(this.date);
        const today = moment().format(this.dateFormatService.shortDateFormat);
        const yesterday = moment().subtract(1, 'days').format(this.dateFormatService.shortDateFormat);
        this.renderTime = this.dateFormatService.format(this.date, 'onlyTime');

        switch (date) {
            case today:
                this.renderDate = this.translate.instant('interface.basic.today');
                this.tooltipDate = today;
                if (this.changeColor) {
                    this.colorGreen = true;
                }
                break;
            case yesterday:
                this.renderDate = this.translate.instant('interface.basic.yesterday');
                this.tooltipDate = yesterday;
                break;
            default:
                this.renderDate = date;
                break;
        }
    }
}
