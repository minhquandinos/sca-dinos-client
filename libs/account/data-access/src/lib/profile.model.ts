import { Expose, Transform, Type } from 'class-transformer';
import { JsonObject, JsonProperty } from 'json2typescript';

import { ProfileApiStatusType } from '@scaleo/account/common';
import { BooleanEnum } from '@scaleo/core/data';
import { DateFormatEnum, NumberFormatEnum } from '@scaleo/platform/format/models';
import { BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';
import { Util } from '@scaleo/utils';

const test =
    '[{"id":94,"email":"affilaite@manager.com","show_email_for_users":"1","firstname":"Партнерский","lastname":"Менеджер","image":"img624d37bebaab3.png","contacts":"[{\\"type\\":1,\\"account\\":\\"rrrr\\",\\"title\\":\\"\\"}]","phone":"+12345","role":"affiliate-manager"},{"id":107,"email":null,"show_email_for_users":null,"firstname":null,"lastname":null,"image":null,"contacts":null,"phone":null,"role":"88398fd5d7bfffa8d1a123c827157f21"}]';

export class MenuItemModel {
    @Expose()
    class: string = undefined;

    @Expose()
    route: string = undefined;

    @Expose()
    title: string = undefined;
}

export class MenuModel {
    @Expose()
    title: string = undefined;

    @Expose()
    @Type(() => MenuItemModel)
    items: MenuItemModel[] = [];
}

@JsonObject('RelationMessengersModel')
export class RelationMessengersModel {
    @JsonProperty('type', String)
    type: number = undefined;

    @JsonProperty('account', String)
    account: string = undefined;

    @JsonProperty('title', String)
    title: string = undefined;
}

export class ProfileModel {
    @Expose()
    api_key: string = undefined;

    @Expose()
    api_status: ProfileApiStatusType = undefined;

    @Expose()
    contacts?: RelationMessengersModel[] = [];

    @Expose()
    date_format_id: DateFormatEnum = undefined;

    @Expose()
    email: string = undefined;

    @Expose()
    firstname: string = undefined;

    @Expose()
    phone: string = undefined;

    @Expose()
    id: number = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    lastname: string = undefined;

    @Expose()
    number_format_id: NumberFormatEnum = undefined;

    @Expose()
    role: {
        value: DefaultRoleEnum | string;
        label: string;
    };

    @Expose()
    base_role: BaseRoleType = undefined;

    @Expose()
    permissions: string[] = [];

    @Expose()
    status: number = undefined;

    @Expose()
    timezone: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    managers_assigned?: any[] = []; // TODo NX remove any

    @Expose()
    @Type(() => MenuModel)
    menu: MenuModel[] = [];

    @Expose({ name: 'menu-leads' })
    @Type(() => MenuModel)
    private _menu_leads: MenuModel[] = [];

    @Expose()
    get menuLeads(): MenuModel[] {
        return this._menu_leads;
    }

    @Expose()
    image_data?: string = '';

    @Expose()
    dashboard_config_custom?: string = undefined;

    @Expose()
    dashboard_config_default?: string = undefined;

    @Expose()
    show_email_for_users?: number = undefined;

    // TODO remove
    @Expose()
    show_network_revenue?: number = undefined;

    @Expose()
    custom_fields?: any[] = []; //TODO PlatformListsFormatInterface

    @Expose()
    address?: string = undefined;

    @Expose()
    city?: string = undefined;

    @Expose()
    region?: string = undefined;

    @Expose()
    country?: number = undefined;

    @Expose()
    postal_code?: string = undefined;

    @Expose()
    payment_details?: string = undefined;

    @Expose()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum = BooleanEnum.False;
}

export interface ProfileRequestModel {
    api_key: string;

    api_status: number;

    contacts?: string;

    date_format_id: DateFormatEnum;

    email: string;

    firstname: string;

    phone: string;

    id: number;

    image: string;

    lastname: string;

    number_format_id: NumberFormatEnum;

    role: DefaultRoleEnum;

    status: number;

    timezone: string;

    managers_assigned: string;

    menu: MenuModel;

    image_data?: string;

    dashboard_config_custom?: string;

    dashboard_config_default?: string;

    show_email_for_users: string;

    custom_fields?: any;
}
