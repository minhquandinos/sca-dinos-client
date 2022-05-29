import { DateUtil } from '@scaleo/platform/date/util';

export class ChartDataTransform {
    static colorMap = {
        cv_pending: '#ffba11',
        cv_rejected: '#ff0000',
        rr: '#ff6a11',
        impressions: '#0ebfe0',
        ctr: '#0f92ff',
        cv_approved: '#2ab166',
        cr: '#47d80f',
        pr: '#ffdc11',
        clicks: '#930cff',
        unique_clicks: '#c117e0',
        duplicate_clicks: '#ff0eb0',
        invalid_clicks: '#ff0000',
        cv_total: '#0ee0ba',
        tr: '#78bd93',
        approved_revenue: '#0f92ff',
        approved_payout: '#ffba11',
        approved_profit: '#2ab166',
        approved_gross_sales: '#9eb76f',
        pending_revenue: '#0ebfe0',
        pending_payout: '#ff6a11',
        pending_profit: '#47d80f',
        pending_gross_sales: '#bdb37d',
        rpc: '#6cd0f1',
        cpc: '#a06542',
        epc: '#78bd93',
        rpa: '#69aee8',
        cpa: '#a04342',
        epa: '#819f1b',
        rpm: '#6992e8',
        cpm: '#d09360',
        epm: '#9eb76f',
        clicks_revenue: '#7d7ce9',
        clicks_payout: '#d09360',
        clicks_profit: '#6ea362',
        total_revenue: '#0f14ff',
        total_payout: '#ffdc11',
        total_profit: '#0ee0ba',
        total_gross_sales: '#c117e0',
        rejected_revenue: '#930cff',
        rejected_payout: '#e0ca19',
        rejected_profit: '#acd80f',
        rejected_gross_sales: '#a1c887'
    };

    private static transformDate(type, date: string, lang: string): string {
        const [year] = date.split('-');

        const today = DateUtil.moment();
        const nowTime = `${today.format('HH')}:${today.format('MM')}`;
        const dateWithTime = `${date} ${nowTime}`;

        DateUtil.moment().locale(lang);
        switch (type) {
            case 'hour':
                return DateUtil.moment(date).format('dddd, D MMM YYYY HH:00').replace(/\./, '');
            case 'day':
                return DateUtil.moment(dateWithTime).format('dddd, D MMM YYYY').replace(/\./, '');
            case 'month':
                return DateUtil.moment(dateWithTime).format('MMM YYYY').replace(/\./, '');
            case 'year':
                return year;
            default:
                return undefined;
        }
    }

    seriesColorMap(key: string): string {
        const color = ChartDataTransform.colorMap;

        return color[key] ? color[key] : 'pink';
    }

    convertCategories(categories: string[], breakdown, lang: string): string[] {
        return categories.map((date) => ChartDataTransform.transformDate(breakdown, date, lang));
    }
}
