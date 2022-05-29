import { Provider } from '@angular/core';

import { PaymentUpsertMethodsApi } from '../upsert/payment-upsert-methods.api';
import { PaymentUpsertMethodsService } from '../upsert/payment-upsert-methods.service';

export const PAYMENT_UPSERT_PROVIDER: Provider[] = [PaymentUpsertMethodsService, PaymentUpsertMethodsApi];
