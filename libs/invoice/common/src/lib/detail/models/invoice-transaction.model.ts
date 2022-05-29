import { Expose, Type } from 'class-transformer';

export class InvoiceOfferModel {
    @Expose()
    id: number = undefined;

    @Expose()
    name: string = undefined;
}

export class Billing2InvoiceItemModel {
    @Expose()
    amount: number = undefined;

    @Expose()
    goal_name: string = undefined;

    @Expose()
    offer: InvoiceOfferModel = undefined;

    @Expose()
    price: number = undefined;

    @Expose()
    quantity: number = undefined;

    @Expose()
    transaction_type: number = undefined;
}

export class Billing2InvoiceSummaryModel {
    @Expose()
    subtotal: string = undefined;

    @Expose()
    vat: number = undefined;

    @Expose()
    vat_amount: string = undefined;

    @Expose()
    total: string = undefined;

    @Expose()
    advance: string = undefined;
}

export class Billing2InvoiceAdjustmentAdvanceModel {
    @Expose()
    name?: string = undefined;

    @Expose()
    amount: string = undefined;
}

export class InvoiceTransactionModel {
    @Expose()
    @Type(() => Billing2InvoiceItemModel)
    items: Billing2InvoiceItemModel[] = [];

    @Expose()
    @Type(() => Billing2InvoiceAdjustmentAdvanceModel)
    adjustment: Billing2InvoiceAdjustmentAdvanceModel = undefined;

    @Expose()
    @Type(() => Billing2InvoiceAdjustmentAdvanceModel)
    advance: Billing2InvoiceAdjustmentAdvanceModel = undefined;

    @Expose()
    @Type(() => Billing2InvoiceSummaryModel)
    summary: Billing2InvoiceSummaryModel = undefined;

    @Expose()
    referral_amount: string = undefined;
}

export interface InvoiceUpdateAmountRequestModel {
    adjustment_title: string;
    adjustment_amount: string;
    advance_plus_amount: string;
}

export interface InvoiceUpdateAmountResponseModel {
    adjustment_amount: string;
    adjustment_title: string;
    advance_minus_amount: string;
    advance_plus_amount: string;
    amount: string;
    referral_amount: string;
    subtotal_amount: string;
    transactions_amount: string;
    vat_amount: string;
    vat: number;
}
