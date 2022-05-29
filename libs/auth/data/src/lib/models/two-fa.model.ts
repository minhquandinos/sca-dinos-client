import { BooleanEnum } from '@scaleo/core/data';

import { AuthInterface } from '../interfaces/auth.interface';

export interface TwoFAConfig2Model {
    service: AuthInterface;
}

export interface TwoFACodeModel {
    code: number;
}

export interface TwoFaResendCodePayloadModel {
    email: string;
    password: string;
}

export interface TwoFaResendCodeSignUpPayloadModel extends TwoFaResendCodePayloadModel {
    password_repeat: string;
}

export interface TwoFAModel {
    twoFA_enabled: BooleanEnum;
}
