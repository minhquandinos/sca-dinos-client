import { InvoicesPaymentsTermsIdEnum, InvoicesPaymentsTermsNameEnum, InvoicesPaymentsTermsTranslateEnum } from '../../enums/platform-list';

export const INVOICES_PAYMENTS_TERMS_TRANSLATE_MAP = Object.freeze({
    [InvoicesPaymentsTermsIdEnum.None]: InvoicesPaymentsTermsTranslateEnum.None,
    [InvoicesPaymentsTermsIdEnum.Net7]: InvoicesPaymentsTermsTranslateEnum.Net7,
    [InvoicesPaymentsTermsIdEnum.Net14]: InvoicesPaymentsTermsTranslateEnum.Net14,
    [InvoicesPaymentsTermsIdEnum.Net30]: InvoicesPaymentsTermsTranslateEnum.Net30,
    [InvoicesPaymentsTermsIdEnum.Net60]: InvoicesPaymentsTermsTranslateEnum.Net60
});

export const INVOICES_PAYMENTS_TERMS_NAME_TRANSLATE_MAP = Object.freeze({
    [InvoicesPaymentsTermsNameEnum.None]: InvoicesPaymentsTermsTranslateEnum.None,
    [InvoicesPaymentsTermsNameEnum.Net7]: InvoicesPaymentsTermsTranslateEnum.Net7,
    [InvoicesPaymentsTermsNameEnum.Net14]: InvoicesPaymentsTermsTranslateEnum.Net14,
    [InvoicesPaymentsTermsNameEnum.Net30]: InvoicesPaymentsTermsTranslateEnum.Net30,
    [InvoicesPaymentsTermsNameEnum.Net60]: InvoicesPaymentsTermsTranslateEnum.Net60
});
