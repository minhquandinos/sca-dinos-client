import { BaseObjectModel } from '@scaleo/core/data';
import { PlatformSettingsModel } from '@scaleo/platform/settings/access-data';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

const columns: BaseObjectModel<string, UiTable2ColumnsModel> = {
    id: {
        value: 'id',
        translate: 'table.column.offer',
        colWidth: '30%',
        sort: true
    },
    goals: {
        value: 'goals',
        translate: 'table.column.goals',
        colWidth: '11%',
        sort: false
    },
    targeting: {
        value: 'targeting',
        translate: 'table.column.targeting',
        colWidth: '16%',
        sort: false
    },
    tags: {
        value: 'tags',
        translate: 'table.column.tags',
        sort: false
    },
    cr: {
        value: 'cr',
        translate: 'table.column.performance',
        colWidth: '10.5%',
        sort: true,
        tooltip: true,
        tooltipTranslate: 'offers_page.tooltip.table.performance.update'
    },
    conversions: {
        value: 'conversions',
        translate: 'table.column.conversions',
        colWidth: '145px',
        sort: false,
        tooltip: false
    }
};

const crColumn = (column: 'cr', settings: PlatformSettingsModel): UiTable2ColumnsModel => {
    if (!settings.affiliate_offer_show_performance) {
        return null;
    }
    return columns[column];
};

const offerTableColumnFactory = (column: string, settings: PlatformSettingsModel) => {
    if (column === 'cr') {
        return crColumn(column, settings);
    }

    return columns[column];
};

export const affiliateOfferListTableColumnsFactory = (settings: PlatformSettingsModel): UiTable2ColumnsModel[] =>
    Object.keys(columns)
        .map((column) => offerTableColumnFactory(column, settings))
        .filter((column) => !!column);
