import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { BooleanEnum } from '@scaleo/core/data';

import { ProfileModel } from './profile.model';

export const initialStateForProfileSore = (): Partial<ProfileModel> => ({
    api_key: '',
    api_status: undefined,
    contacts: [],
    date_format_id: undefined,
    email: undefined,
    firstname: undefined,
    phone: undefined,
    id: undefined,
    image: undefined,
    lastname: undefined,
    number_format_id: undefined,
    role: undefined,
    status: undefined,
    timezone: undefined,
    managers_assigned: undefined,
    menu: [],
    image_data: undefined,
    dashboard_config_custom: undefined,
    dashboard_config_default: undefined,
    show_email_for_users: undefined,
    // TODO remove
    show_network_revenue: undefined,
    custom_fields: [],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum.False
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile', resettable: true })
export class ProfileStore extends Store<ProfileModel> {
    constructor() {
        super(initialStateForProfileSore());
    }
}
