import { Billing2InvoiceGenerateRequestDto } from '@scaleo/feature/manager/affiliate-billing/invoice/generate/data-access';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface Billing2InvoiceUpdateResponseModel
    extends Omit<Billing2InvoiceGenerateRequestDto, 'affiliate_id' | 'start_date' | 'end_date' | 'attachment_file'> {
    status: InvoiceStatusNameEnum;
    date_due: string;
    invoice_memo: string;
    internal_notes: string;
    attachment: string;
}

export interface Billing2InvoiceUpdateRequestModel extends Omit<Billing2InvoiceUpdateResponseModel, 'attachment'> {
    attachment_file?: File;
}

export type Billing2InvoiceAttachmentRequestModel = Pick<Billing2InvoiceUpdateRequestModel, 'attachment_file'>;
