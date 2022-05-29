import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { FormatByKeyPipe, FormatPipe } from '@scaleo/platform/format/pipe';
import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { AmpPipe } from '../../pipes/amp/amp.pipe';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-default',
    templateUrl: './report-field-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatByKeyPipe, AmpPipe, FormatPipe]
})
export class ReportFieldDefaultComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> implements OnInit {
    readonly ignore: string[] = [
        'extra_1',
        'extra_2',
        'extra_3',
        'extra_4',
        'extra_5',
        'aff_click_id',
        'deep_link_url',
        'advertiser_track_id',
        'advertiser_order_id',
        'advertiser_user_id',
        'adv_extra_1',
        'adv_extra_2',
        'adv_extra_3',
        'adv_extra_4',
        'adv_extra_5',
        'year',
        'payout',
        'profit',
        'revenue',
        'advertiser_amount',
        'phone',
        'birthday',
        'idfa',
        'gaid',
        'added_timestamp',
        'changed_timestamp'
    ];

    readonly additionalPipeFormat: { [key: string]: string[] } = {
        postback_url: ['amp'],
        aff_click_url: ['amp'],
        click_referer_url: ['amp'],
        advertiser_referer_url: ['amp'],
        link: ['amp'],
        destination: ['amp'],
        advertiser_amount: ['number'],
        payout: ['money'],
        profit: ['money'],
        revenue: ['money']
    };

    private _defaultField$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    readonly defaultField$ = this._defaultField$.asObservable();

    private newFieldValue: string;

    constructor(private formatByKeyPipe: FormatByKeyPipe, private ampPipe: AmpPipe, private formatPipe: FormatPipe) {
        super();
    }

    ngOnInit(): void {
        if (this.key) {
            this.defaultFormat().additionalFieldFormat().setNewValue();
        }
    }

    private defaultFormat(): this {
        this.newFieldValue = this.field?.value as string;
        if (!this.ignore.includes(this.key)) {
            this.newFieldValue = this.formatByKeyPipe.transform(this.newFieldValue, this.key, {
                currency: this.currency
            });
        }

        return this;
    }

    private additionalFieldFormat(): this {
        if (this.isNeedAdditionalPipeFormat) {
            this.additionalPipeFormat[this.key].forEach((pipe) => {
                switch (pipe) {
                    case 'amp':
                        this.newFieldValue = this.formatAmp(this.newFieldValue);
                        break;
                    case 'money':
                        this.newFieldValue = this.formatMoney(this.newFieldValue);
                        break;
                    case 'number':
                    default:
                        this.newFieldValue = this.formatNumber(this.newFieldValue);
                        break;
                }
            });
        }
        return this;
    }

    private get isNeedAdditionalPipeFormat(): boolean {
        return Object.keys(this.additionalPipeFormat).some((pipe) => pipe === this.key);
    }

    private setNewValue(): void {
        this._defaultField$.next(this.newFieldValue);
    }

    private formatMoney(value: string): string {
        return this.formatPipe.transform(value, 'money', {
            currency: this._item?.currency as CurrencyEnum
        });
    }

    private formatNumber(value: string): string {
        return this.formatPipe.transform(value, 'number');
    }

    private formatAmp(value: string): string {
        return this.ampPipe.transform(value);
    }
}
