import { InjectionToken } from '@angular/core';
import { StoreConfigOptions } from '@datorama/akita';

export const TRANSACTION_REPORT_STORE_CONFIG_TOKEN = new InjectionToken<Partial<StoreConfigOptions>>('ReportConversionStoreConfig');
