export interface RequestPaymentModalOutputModel {
    amount: number;
    attachment_file?: File;
}

export interface SendPaymentRequestResponseDto {
    invoice_id: number;
    invoice_number: string;
    amount: number;
}
