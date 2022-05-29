import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { PlatformListsBaseInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { ArrayUtil } from '@scaleo/utils';

@Component({
    selector: 'app-report-currency',
    templateUrl: './report-currency.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportCurrencyComponent implements OnInit {
    @Input() currentCurrency: CurrencyEnum;

    @Output() toggle: EventEmitter<CurrencyEnum> = new EventEmitter<CurrencyEnum>();

    currencies$: Observable<CurrencyEnum[]>;

    constructor(private readonly platformListsService: PlatformListsService) {}

    ngOnInit(): void {
        this.currencies$ = this.getCurrencies$;
    }

    emitCurrency(currency: CurrencyEnum): void {
        this.toggle.emit(currency);
    }

    private get getCurrencies$(): Observable<CurrencyEnum[]> {
        return this.platformListsService.platformListsNew('currencies').pipe(
            pluck('currencies'),
            map((currencies: PlatformListsBaseInterface[]) => ArrayUtil.pickByKey(currencies, 'code') as CurrencyEnum[])
        );
    }
}
