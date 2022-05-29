import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

interface OfferProfileGoalsTableColumnsModel extends UiTableHeaderInterface {
    ignoreForMobile?: boolean;
}

const columns: OfferProfileGoalsTableColumnsModel[] = [
    {
        value: 'title',
        key: 'title',
        translateKey: 'table.column.title',
        colWidth: '30%'
    },
    {
        value: 'payout',
        key: 'payout',
        translateKey: 'table.column.payout',
        colWidth: '22%'
    },
    {
        value: 'properties',
        key: 'properties',
        translateKey: 'table.column.properties',
        ignoreForMobile: true,
        colWidth: '15%'
    },
    {
        value: 'caps',
        key: 'caps',
        translateKey: 'table.column.caps',
        colWidth: '26%'
    }
];

export const offerProfileGoalsColumnsFactory = (isMobile: boolean): UiTableHeaderInterface[] =>
    columns.filter((column) => {
        return !(column.ignoreForMobile && isMobile);
    });
