import { InjectionToken } from '@angular/core';
import { StoreConfigOptions } from '@datorama/akita';

export const REPORT_STATISTIC_STORE_CONFIG_TOKEN = new InjectionToken<Partial<StoreConfigOptions>>('ReportStatisticStoreConfig');
