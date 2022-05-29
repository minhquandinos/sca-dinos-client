import { InvoiceTransactionTypePipe } from './invoice-transaction-type.pipe';

describe('InvoiceTransactionTypePipe', () => {
    it('create an instance', () => {
        const pipe = new InvoiceTransactionTypePipe();
        expect(pipe).toBeTruthy();
    });
});
