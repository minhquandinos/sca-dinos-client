import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SheetExtensionType } from '@scaleo/platform/data';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';

import { InvoicesModel } from '../models/invoices.model';

export interface InvoicesServiceInterface {
    index(): Observable<InvoicesModel[]>;
    getColumnsOptions(): Observable<ConfigTableColumn2Model[]>;
    reloadItems(): void;
    exportData(format: SheetExtensionType, selected: number[]): Promise<HttpResponse<ArrayBuffer>>;
}
