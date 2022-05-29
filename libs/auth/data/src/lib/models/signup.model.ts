import { TwoFACodeModel } from './two-fa.model';

export type SignUpTwoFAPayloadDto = { email: string } & TwoFACodeModel;

export interface SignUpInfoModel {
    city: string;
    country: string;
    country_code: string;
    region: string;
    created: string;
    ip: string;
}
