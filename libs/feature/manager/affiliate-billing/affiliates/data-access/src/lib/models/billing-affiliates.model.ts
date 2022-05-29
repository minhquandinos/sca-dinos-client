import { Expose } from 'class-transformer';

import {
    ColumnsRequestModel,
    LangRequestModel,
    PageRequestModel,
    ShortResponseInterface,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { BaseStatusIdEnum } from '@scaleo/platform/list/access-data';
import { ContactModel } from '@scaleo/shared/components/contact';

export interface PaymentMethodModel {
    currency: CurrencyEnum;
    id: number;
    title: string;
    payment_method_info: string;
    payment_method_logo: string;
}

export class BillingAffiliatesModel {
    @Expose()
    id: string = undefined;

    @Expose()
    affiliate: string = undefined;

    @Expose()
    affiliate_id: number = undefined;

    @Expose()
    email: string = undefined;

    @Expose()
    status: BaseStatusIdEnum = undefined;

    @Expose()
    managers: BillingAffiliateManagerModel[] = undefined;

    @Expose()
    invoice_frequency: number = undefined;

    @Expose()
    payment_methods: PaymentMethodModel[] = [];

    @Expose()
    payment_terms: number = undefined;

    @Expose()
    approved_balance: number = undefined;

    @Expose()
    pending_balance: number = undefined;

    @Expose()
    balance_due: number = undefined;

    @Expose()
    referral_balance: number = undefined;
}

interface BillingAffiliateManagerModel {
    contacts: ContactModel[];
    email: string;
    firstname: string;
    id: number;
    image: string;
    lastname: string;
    phone: string;
    role: string;
    show_email_for_users: string;
}

export interface BillingAffiliateBalanceDue {
    currency: CurrencyEnum;
    total_balance_due: string;
}

export interface BillingAffiliatesRequestModel extends PageRequestModel, ColumnsRequestModel, SortRequestModel, StatusRequestModel {
    invoice_frequency?: string;
    payment_terms?: string;
    payment_methods?: string;
    search: string;
}

export interface BillingAffiliatesParamsStateModel
    extends Omit<BillingAffiliatesRequestModel, 'invoice_frequency' | 'payment_terms' | 'payment_methods'> {
    invoice_frequency?: string[];
    payment_terms?: string[];
    payment_methods?: number[];
}

export interface BillingAffiliatesExportRequestModel extends BillingAffiliatesRequestModel, LangRequestModel {
    lang?: string;
    format?: string;
    affiliate_ids?: string;
}
