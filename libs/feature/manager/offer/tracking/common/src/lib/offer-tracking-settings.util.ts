export namespace OfferTrackingSettingsUtil {
    export const postback = (domain: string, token: string): string => {
        const url = new URL(`${domain}/track/goal-by-click-id`);
        const { searchParams } = url;
        searchParams.append('click_id', '{click_id}');
        searchParams.append('amount', '{sale_amount}');
        if (token) {
            searchParams.append('token', token);
        }
        return decodeURI(url.href);
    };
}
