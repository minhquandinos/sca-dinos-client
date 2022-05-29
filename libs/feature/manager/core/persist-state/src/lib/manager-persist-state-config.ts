import { BaseObjectModel } from '@scaleo/core/data';

import { ReportStatisticsPersist } from '../../../../../../reports/statistic/list/src/lib/state';
import { ReportClicksPersist } from '../../../../../../reports/transactions/click/data-access/src/lib/state';
import { ReportConversionPersist } from '../../../../../../reports/transactions/conversion/data-access/src/lib/state';
import { ReportAdvertiserPostbacksPersist } from '../../../../../../reports/transactions/logs/advertiser-postback/data-access/src/lib/state/report-advertiser-postbacks.persist';
import { ReportAffiliatesPostbacksPersist } from '../../../../../../reports/transactions/logs/affiliate-postback/data-access/src/lib/state/report-affiliates-postbacks.persist';
import { ReportInvalidClicksPersist } from '../../../../../../reports/transactions/logs/invalid-click/data-access/src/lib/state/report-invalid-clicks.persist';
import { AffiliateAccessInvoicesWidgetPersist } from '../../../../../affiliate/billing/widgets/invoices/data-access/src/lib/state/affiliate-access-invoices-widget.persist';
import { BillingAffiliatesPersist } from '../../../../affiliate-billing/affiliates/data-access/src/lib/state/billing-affiliates.persist';
import { Billing2InvoicesPersist } from '../../../../affiliate-billing/invoices/data-access/src/lib/state/billing2-invoices.persist';
import { LeadsLogsPersist } from '../../../../leads/logs/data-access/src/lib/state/leads-logs.persist';
import { LeadsListPersist } from '../../../../leads/manage/data-access/src/lib/state/leads-list.persist';
import { ManagerStateNameEnum } from './manager-state-name.enum';

export const KEY_PERSIST_STATE = 'scaleo__persist';

// export const INCLUDE_PERSIST_STATE: BaseObjectModel = {
//     [ManagerStateNameEnum.ReportConversions]: (storeName: string, state: any) => new ReportConversionPersist(storeName, state),
//     [ManagerStateNameEnum.ReportStatistics]: (storeName: string, state: any) => new ReportStatisticsPersist(storeName, state),
//     [ManagerStateNameEnum.ReportClicks]: (storeName: string, state: any) => new ReportClicksPersist(storeName, state),
//     [ManagerStateNameEnum.ReportInvalidClicks]: (storeName: string, state: any) => new ReportInvalidClicksPersist(storeName, state),
//     [ManagerStateNameEnum.ReportAffiliatesPostbacks]: (storeName: string, state: any) =>
//         new ReportAffiliatesPostbacksPersist(storeName, state),
//     [ManagerStateNameEnum.ReportAdvertiserPostbacks]: (storeName: string, state: any) =>
//         new ReportAdvertiserPostbacksPersist(storeName, state),
//     [ManagerStateNameEnum.Leads]: (storeName: string, state: any) => new LeadsListPersist(storeName, state),
//     [ManagerStateNameEnum.LeadsLogs]: (storeName: string, state: any) => new LeadsLogsPersist(storeName, state),
//     [ManagerStateNameEnum.Billing2Invoices]: (storeName: string, state: any) => new Billing2InvoicesPersist(storeName, state),
//     [ManagerStateNameEnum.BillingAffiliates]: (storeName: string, state: any) => new BillingAffiliatesPersist(storeName, state),
//     [ManagerStateNameEnum.AffiliateAccessInvoices]: (storeName: string, state: any) =>
//         new AffiliateAccessInvoicesWidgetPersist(storeName, state)
// };
