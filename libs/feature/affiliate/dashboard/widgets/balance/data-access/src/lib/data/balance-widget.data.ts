import { Injectable } from '@angular/core';

import { BaseDataService } from '@scaleo/core/state/custom-state';

import { BalanceInvoicesWidgetModel } from '../models/balance-widget.model';

@Injectable()
export class BalanceWidgetData extends BaseDataService<BalanceInvoicesWidgetModel> {}
