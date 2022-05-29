import { GoalTypesEnum } from '@scaleo/offer/common';

export class GoalsTrackingCode {
    constructor(private goalId: string, private typeGoal: GoalTypesEnum, private url: URL) {}

    postback(goalIsDefault: boolean, alias: string, postbackToken: string): string {
        const getIdValueForUrl = (goalIsDefault && !alias) || alias ? '{CLICK_ID}' : '{REQUIRED}';

        this.url.pathname = 'track/goal-by-click-id';
        if (!(goalIsDefault && !alias)) {
            this.url.searchParams.append(alias ? 'goal_alias' : 'goal_id', alias || this.goalId);
        }

        this.url.searchParams.append('click_id', getIdValueForUrl);
        if (this.addAmountReq) {
            this.url.searchParams.append('amount', this.addAmountReq);
        }

        if (postbackToken) {
            this.url.searchParams.append('token', postbackToken);
        }

        return this.getDecodeUrlHref;
    }

    iframePixel(): string {
        this.url.pathname = 'track/iframe';
        this.url.searchParams.append('goal_id', this.goalId);
        if (this.addAmountReq) {
            this.url.searchParams.append('amount', this.addAmountReq);
        }
        return `<iframe src="${this.getDecodeUrlHref}" height="1" width="1" frameborder="0" scrolling="no"></iframe>`;
    }

    javascriptPixel(): string {
        this.url.pathname = 'track/js';
        this.url.searchParams.append('goal_id', this.goalId);
        if (this.addAmountReq) {
            this.url.searchParams.append('amount', this.addAmountReq);
        }
        return `<script src="${this.getDecodeUrlHref}"></script>`;
    }

    imgPixel() {
        this.url.pathname = 'track/img';
        this.url.searchParams.append('goal_id', this.goalId);
        if (this.addAmountReq) {
            this.url.searchParams.append('amount', this.addAmountReq);
        }
        return `<img src="${this.getDecodeUrlHref}" height="1" width="1" />`;
    }

    private get addAmountReq(): string {
        return this.typeGoal === GoalTypesEnum.CPS ? '{REQUIRED}' : null;
    }

    private get getDecodeUrlHref(): string {
        return decodeURI(this.url.href);
    }
}
