import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    template: ``
})
export abstract class BaseReferralListComponent implements OnInit {
    abstract readonly items$: Observable<unknown>;

    readonly pagination$: Observable<ApiPaginationModel>;

    readonly totalCount$: Observable<number>;

    readonly loading$: Observable<boolean>;

    readonly isLoad$: Observable<boolean>;

    readonly currency: string = this.platformReferralSettingsService.referralCommissionCurrency;

    readonly commissionsTypeEnum = ReferralCommissionsTypeEnum;

    commissionInfo: string;

    filterForm: FormGroup;

    protected abstract _tableHeaders: UiTableHeaderInterface[];

    tableHeaders: UiTableHeaderInterface[] = [];

    readonly referralCommissionsType = this.platformReferralSettingsService.referralCommissionsType;

    protected constructor(
        protected fb: FormBuilder,
        protected platformReferralSettingsService: PlatformReferralSettingsService,
        protected formatPipe: FormatPipe
    ) {}

    ngOnInit(): void {
        this.tableHeaders = this.prepareReferralCommissionColumn;
        this.initForm();
        this.setCommissionInfo();
    }

    private get prepareReferralCommissionColumn(): UiTableHeaderInterface[] {
        const headers = this._tableHeaders;
        if (this.platformReferralSettingsService.referralCommissionsType === ReferralCommissionsTypeEnum.Flat) {
            return headers.map((header: UiTableHeaderInterface) => {
                if (header.translateKey === 'table.column.referral_commission_30_day') {
                    header.translateKey = 'table.column.commission';
                }
                return header;
            });
        }
        return headers;
    }

    private setCommissionInfo(): void {
        if (this.platformReferralSettingsService.referralProgram) {
            if (this.platformReferralSettingsService.referralCommissionsType === ReferralCommissionsTypeEnum.Percentage) {
                this.commissionInfo = `${this.platformReferralSettingsService.referralCommission}%`;
            } else {
                this.commissionInfo = this.formatPipe.transform(this.platformReferralSettingsService.referralCommission, 'money', {
                    currency: this.platformReferralSettingsService.referralCommissionCurrency,
                    digitsAfterPoint: 0
                });
            }
        }
    }

    private initForm(): void {
        this.filterForm = this.fb.group({
            status: ['']
        });
    }
}
