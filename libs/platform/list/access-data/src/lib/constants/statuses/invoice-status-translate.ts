import { InvoiceStatusNameEnum, InvoiceStatusTranslateEnum, ScaleoStatusColorEnum } from '../../enums/statusses';

export const INVOICE_STATUS_TRANSLATE_MAP: Record<InvoiceStatusNameEnum, InvoiceStatusTranslateEnum> = Object.freeze({
    [InvoiceStatusNameEnum.Paid]: InvoiceStatusTranslateEnum.Paid,
    [InvoiceStatusNameEnum.Unpaid]: InvoiceStatusTranslateEnum.Unpaid,
    [InvoiceStatusNameEnum.Draft]: InvoiceStatusTranslateEnum.Draft,
    [InvoiceStatusNameEnum.InProgress]: InvoiceStatusTranslateEnum.InProgress
});

export const INVOICE_STATUS_COLOR_MAP: Record<InvoiceStatusNameEnum, ScaleoStatusColorEnum> = Object.freeze({
    [InvoiceStatusNameEnum.Paid]: ScaleoStatusColorEnum.Green,
    [InvoiceStatusNameEnum.Unpaid]: ScaleoStatusColorEnum.Red,
    [InvoiceStatusNameEnum.Draft]: ScaleoStatusColorEnum.Orange,
    [InvoiceStatusNameEnum.InProgress]: ScaleoStatusColorEnum.Gray
});
