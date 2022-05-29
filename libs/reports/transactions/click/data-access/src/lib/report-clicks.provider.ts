import { Provider } from '@angular/core';

import { ReportClicksQuery } from './state/report-clicks.query';
import { ReportClicksService } from './state/report-clicks.service';
import { ReportClicksStore } from './state/report-clicks.store';

export const REPORT_CLICK_PROVIDER: Provider[] = [ReportClicksQuery, ReportClicksStore, ReportClicksService];
