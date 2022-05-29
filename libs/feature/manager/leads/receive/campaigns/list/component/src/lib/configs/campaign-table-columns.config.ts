import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

export const campaignTableColumns: UiTable2ColumnsModel[] = [
    {
        value: 'title',
        translate: 'table.column.title',
        colWidth: '20%',
        sort: false
    },
    {
        value: 'offer',
        translate: 'table.column.offer',
        colWidth: '15%',
        sort: false
    },
    {
        value: 'goal',
        translate: 'table.column.goal',
        colWidth: '15%',
        sort: false
    },
    {
        value: 'payout',
        translate: 'table.column.payout',
        colWidth: '15%',
        sort: false
    },
    {
        value: 'fields',
        translate: 'table.column.fields',
        colWidth: '10%',
        sort: false
    },
    {
        value: 'validations',
        translate: 'leads_ui_page.receive.campaigns.validations.title',
        colWidth: '10%',
        sort: false
    },
    {
        value: 'notes',
        translate: 'table.column.notes',
        colWidth: '15%',
        sort: false
    }
];
