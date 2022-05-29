import { Provider } from '@angular/core';

import { PaymentMethodsApi } from '../collections/payment-methods.api';
import { PaymentMethodsService } from '../collections/payment-methods.service';
import { PaymentMethodsQuery } from '../state/payment-methods.query';
import { PaymentMethodsStore } from '../state/payment-methods.store';

export const PAYMENT_METHOD_STATE_PROVIDER: Provider[] = [
    PaymentMethodsApi,
    PaymentMethodsQuery,
    PaymentMethodsService,
    PaymentMethodsStore
];
