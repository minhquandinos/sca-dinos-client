import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

import { OfferRequestColumnEnum, OfferRequestColumnSortEnum } from '../types/offer-request-columns.enum';

const columns: UiTable2ColumnsModel[] = [
    {
        value: OfferRequestColumnEnum.Date,
        sortValue: OfferRequestColumnSortEnum.Date,
        translate: 'table.column.added_date'
    },
    {
        value: OfferRequestColumnEnum.Status,
        translate: 'table.column.status'
    },
    {
        value: OfferRequestColumnEnum.Offer,
        sortValue: OfferRequestColumnSortEnum.Offer,
        translate: 'table.column.offer',
        responsive: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            XSmall: {
                style: {
                    minWidth: '10rem'
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Large: {
                style: {
                    minWidth: '15rem'
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            XLarge: {
                style: {
                    minWidth: '15rem'
                }
            }
        }
    },
    {
        value: OfferRequestColumnEnum.RequestedBy,
        translate: 'offers_requests_page.requested_by',
        sort: false
    },
    {
        value: OfferRequestColumnEnum.Affiliate,
        sortValue: OfferRequestColumnSortEnum.Affiliate,
        translate: 'table.column.affiliate',
        responsive: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            XSmall: {
                style: {
                    minWidth: '10rem'
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Large: {
                style: {
                    minWidth: '15rem'
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            XLarge: {
                style: {
                    minWidth: '15rem'
                }
            }
        }
    },
    {
        value: OfferRequestColumnEnum.Fraud,
        translate: 'table.column.fraud',
        sort: false
    },
    {
        value: OfferRequestColumnEnum.Questions,
        translate: 'offers_requests_page.approval_questions',
        sort: false,
        responsive: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Medium: {
                style: {
                    minWidth: '10rem'
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Large: {
                style: {
                    minWidth: '15rem'
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            XLarge: {
                style: {
                    minWidth: '21rem'
                }
            }
        }
    }
];

export const offersRequestsColumnsConfig = getConfig(columns);
