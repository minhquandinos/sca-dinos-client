import { Observable } from 'rxjs';

import { InvoicesRequestModel } from '../models/invoices-request.model';

export interface InvoicesQueryInterface {
    columns$: Observable<any>;

    updated$: Observable<InvoicesRequestModel>;
}
