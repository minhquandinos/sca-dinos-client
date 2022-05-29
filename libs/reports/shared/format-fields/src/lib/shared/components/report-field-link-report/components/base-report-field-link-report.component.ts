import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StatisticDefaultRowModel } from '@scaleo/reports/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { BaseReportFieldComponent } from '../../base-report-field.component';

@Component({ template: '' })
export abstract class BaseReportFieldLinkReportComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> implements OnInit {
    private _showValueTpl$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    showValueTpl$ = this._showValueTpl$.asObservable();

    protected constructor() {
        super();
    }

    ngOnInit(): void {
        this.detectNoLinkField();
    }

    abstract navigate(): void;

    private detectNoLinkField() {
        if (this.isTotals || this.breakdown === BreakdownEnum.Hour || +this.field?.value === 0) {
            this._showValueTpl$.next(true);
        }
    }
}
