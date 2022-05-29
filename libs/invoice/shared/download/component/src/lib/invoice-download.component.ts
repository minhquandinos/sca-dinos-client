import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { defer, EMPTY, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
    Billing2InvoiceDownloadPdfService,
    INVOICE_DOWNLOAD_PDF_PROVIDER,
    InvoiceDownloadPdfEnum
} from '@scaleo/invoice/shared/download/data-access';
import { ButtonType, ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-invoice-download',
    template: `
        <ui-button-link
            *ngIf="place"
            (toggle)="download()"
            [type]="buttonType$ | async"
            [label]="label$ | async"
            [isLoad]="fileIsLoad$ | async"
            [disabled]="waitingFile$ | async"
            [icon]="icon$ | async"
        ></ui-button-link>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [INVOICE_DOWNLOAD_PDF_PROVIDER]
})
export class InvoiceDownloadComponent implements OnInit {
    @HostBinding('class') hostClass = 'invoice-download';

    @Input()
    place: keyof Record<InvoiceDownloadPdfEnum, string>; // place

    @Input()
    invoice: number | number[];

    @Output()
    downloaded: EventEmitter<void> = new EventEmitter();

    fileIsLoad$ = this.invoiceDownloadPdf.fileIsLoad$;

    waitingFile$ = this.invoiceDownloadPdf.waitingFile$;

    icon$: Observable<string>;

    label$: Observable<string>;

    buttonType$: Observable<ButtonType>;

    constructor(
        private invoiceDownloadPdf: Billing2InvoiceDownloadPdfService,
        private toastr: ToastrBarService,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        const place$ = of(this.place);

        this.icon$ = this.waitingFile$.pipe(
            switchMap((waitingFile) => defer(() => (!waitingFile ? place$ : of(undefined)))),
            map((type) => (type === InvoiceDownloadPdfEnum.List ? 'ic_pdf' : undefined))
        );

        this.label$ = place$.pipe(
            switchMap((place) =>
                defer(() => {
                    const btnWithLabel = [InvoiceDownloadPdfEnum.All, InvoiceDownloadPdfEnum.Detail];
                    return btnWithLabel.includes(place) ? this.translate.stream('interface.basic.download_file', { file: 'PDF' }) : EMPTY;
                })
            )
        );

        this.buttonType$ = place$.pipe(
            map((place) => {
                const btnType = {
                    [InvoiceDownloadPdfEnum.All]: 'main-floating',
                    [InvoiceDownloadPdfEnum.List]: 'text',
                    [InvoiceDownloadPdfEnum.Detail]: 'floating'
                };
                return btnType[place] as ButtonType;
            })
        );
    }

    download(): void {
        this.invoiceDownloadPdf.waitingFileChange();
        this.downloadFactory
            .then(() => {
                this.downloaded.emit();
            })
            .catch(() => {
                this.toastr.response(ToastrBarEventEnum.DownloadFileException);
            })
            .finally(() => {
                this.invoiceDownloadPdf.waitingFileChange();
            });
    }

    private get downloadFactory(): Promise<any> {
        switch (this.place) {
            case InvoiceDownloadPdfEnum.All:
                return this.invoiceDownloadPdf.downloadSelected(this.invoice as number[]);
            case InvoiceDownloadPdfEnum.List:
            case InvoiceDownloadPdfEnum.Detail:
                return this.invoiceDownloadPdf.download(this.invoice as number);
            default:
                return Promise.reject();
        }
    }
}
