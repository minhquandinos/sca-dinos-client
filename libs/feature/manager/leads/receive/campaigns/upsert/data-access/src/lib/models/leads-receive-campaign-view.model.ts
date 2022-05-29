import { Expose, Type } from 'class-transformer';

import { BaseLeadsReceiveCampaignModel, LeadsReceiveCampaignFieldModel } from '@scaleo/feature/manager/leads/receive/common';
import { CampaignFieldValidationTypeEnum } from '@scaleo/platform/list/access-data';

export class LeadsReceiveCampaignViewModel extends BaseLeadsReceiveCampaignModel {
    @Expose()
    offer_id: number = undefined;

    @Expose()
    goal_id: number = undefined;

    @Expose()
    fields: LeadsReceiveCampaignFieldModel[] = [];

    @Expose()
    @Type(() => CampaignFieldValidationsModel)
    validations: CampaignFieldValidationsModel[] = [];

    @Expose()
    additional_info_for_reply: string = undefined;
}

export interface CampaignFieldValidationsPostModel {
    name: string;
    type: CampaignFieldValidationTypeEnum;
    value: string;
}

export class CampaignFieldValidationsModel {
    @Expose()
    name: string = undefined;

    @Expose()
    type: CampaignFieldValidationTypeEnum = undefined;

    @Expose({ name: 'value' })
    private _value: string = undefined;

    @Expose()
    get value(): string | string[] {
        return this.type === CampaignFieldValidationTypeEnum.Format ? this._value.split(',') : this._value;
    }

    @Expose()
    get title(): string {
        return this.name;
    }
}
