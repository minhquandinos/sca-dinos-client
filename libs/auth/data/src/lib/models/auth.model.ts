import { BooleanEnum } from '@scaleo/core/data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

import { TwoFACodeModel } from './two-fa.model';

export interface AuthModel {
    credentials?: CredentialsModel;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled?: BooleanEnum;
}

export interface CredentialsModel {
    accessToken: string;
    role: DefaultRoleEnum;
}

export type StoreCredentialsType = [DefaultRoleEnum, string];

export interface AuthPayloadDto {
    email: string;
    password: string;
}

export type AuthTwoFAPayloadDto = AuthPayloadDto & TwoFACodeModel;
