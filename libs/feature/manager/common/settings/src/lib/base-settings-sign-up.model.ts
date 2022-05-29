import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { ArrayUtil } from '@scaleo/utils';

export class BaseSettingsSignUpModel {
    @Expose()
    auto_approve_new_users: boolean = undefined;

    @Expose()
    must_agree_with_terms_and_conditions: BooleanEnum = undefined;

    @Expose()
    must_agree_with_privacy_policy: BooleanEnum = undefined;

    @Expose()
    custom_signup_url: string = undefined;

    @Expose()
    redirect_url_after_signup: string = undefined;

    @Expose()
    signup_process: BooleanEnum = undefined;

    @Expose()
    default_managers_selected: ShortManagerModel[] = undefined;
}

export class BaseSettingsSignUpViewModel extends BaseSettingsSignUpModel {
    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    invite_enabled: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    random_manager_enabled: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
    custom_fields: CustomFieldInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
    required_fields: CustomFieldInterface[] = undefined;

    @Expose()
    @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
    optional_fields: CustomFieldInterface[] = undefined;

    @Expose()
    @Transform(
        ({ value }) =>
            value
                .split(',')
                .map((id: unknown) => +id)
                .filter((id: unknown) => !!id),
        { toClassOnly: true }
    )
    default_managers: number[] = undefined;
}

export class BaseSettingsSignUpPayloadModel extends BaseSettingsSignUpModel {
    @Expose()
    invite_enabled: BooleanEnum = undefined;

    @Expose()
    random_manager_enabled: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    custom_fields: string = undefined;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    required_fields: string = undefined;

    @Expose()
    @Transform(({ value }) => JSON.stringify(value), { toClassOnly: true })
    optional_fields: string = undefined;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value), { toClassOnly: true })
    default_managers: string = undefined;
}

export interface BaseSettingsSignUpDto {
    auto_approve_new_users?: boolean;
    required_fields: string;
    optional_fields: string;
    custom_fields: string;
    must_agree_with_terms_and_conditions: boolean;
    must_agree_with_privacy_policy: boolean;
    custom_signup_url: string;
    redirect_url_after_signup: string;
    signup_process: number;
    invite_enabled: string;
    random_manager_enabled: number;
    default_managers: string;
    default_managers_selected: ShortManagerModel[];
}
