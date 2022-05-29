export interface AffiliateBillingModel {
    invoice_type: number;
    invoice_frequency: number;
    invoice_days_of_the_month: string;
    invoice_first_day_of_the_month?: number;
    invoice_second_day_of_the_month?: number;
    invoice_day_of_the_week: string;
    generate_invoice_automatically: number;
    include_referral_balance: number;
    allow_to_enter_an_amount: number;
    allow_an_attachment: number;
    show_the_balance_of_pending_conversions: number;
    information_for_affiliates: string;
    default_payment_terms: number;
    bill_to_name?: string;
    bill_to_address?: string;
    bill_to_email?: string;
    bill_to_tax_id?: string;
    invoice_footer?: string;
    default_invoice_status?: string;
}

/*
 * @deprecated please use new enum AffiliateInvoiceFrequencyEnum
 * */
// export enum PaymentsTypesEnum {
//     BySchedule = 1,
//     ByAffiliateRequest = 2
// }
