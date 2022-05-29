import { Component, Input, OnInit } from '@angular/core';

import { ActivityLogInterface, ActivityObjectTypeEnum } from '@scaleo/activity-log/common';

@Component({
    template: ''
})
export abstract class BaseActivityComponent implements OnInit {
    @Input() item: ActivityLogInterface;

    actionPath: string;

    readonly activityObjectTypeEnum = ActivityObjectTypeEnum;

    ngOnInit() {
        this.setTranslatePath();
    }

    setTranslatePath() {
        switch (this.item.activity.object_type) {
            case ActivityObjectTypeEnum.AffiliateAccess:
            case ActivityObjectTypeEnum.Goal:
            case ActivityObjectTypeEnum.Announcement:
                this.actionPath = 'action_for_goal';
                break;
            case ActivityObjectTypeEnum.CustomParam:
                this.actionPath = 'action_custom_params';
                break;
            case ActivityObjectTypeEnum.OfferRequest:
                this.actionPath = 'action_for_offer_request';
                break;
            default:
                this.actionPath = 'action';
        }
    }
}
