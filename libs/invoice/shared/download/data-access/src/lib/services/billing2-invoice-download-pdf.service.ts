import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Billing2InvoiceDownloadPdfApi } from '../api/billing2-invoice-download-pdf.api';

@Injectable()
export class Billing2InvoiceDownloadPdfService {
    private _waitingFile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly waitingFile$ = this._waitingFile$.asObservable();

    readonly fileIsLoad$ = this.waitingFile$.pipe(map((value) => !value));

    constructor(private api: Billing2InvoiceDownloadPdfApi) {}

    download(id: number): Promise<any> {
        return this.api.download(id).toPromise();
    }

    downloadSelected(ids: number[]): Promise<any> {
        return this.api.downloadSelected(ids).toPromise();
    }

    waitingFileChange(): void {
        this._waitingFile$.next(!this._waitingFile$.value);
    }
}
