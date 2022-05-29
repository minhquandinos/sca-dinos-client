export interface ConversionViewDto {
    readonly email: string;
    readonly ip: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly address: string;
    readonly country: number;
    readonly region: string;
    readonly city: string;
    readonly postcode: string;
    readonly phone: string;
    readonly gender: string;
    readonly birthday: string;
    readonly vertical: string;
    readonly custom1: string;
    readonly custom2: string;
    readonly custom3: string;
    readonly custom4: string;
    readonly custom5: string;
    readonly custom6: string;
    readonly custom7: string;
    readonly custom8: string;
    readonly custom9: string;
    readonly custom10: string;
    readonly public_notes: string;
    readonly private_notes: string;
}

export interface ConversionEditDto {
    readonly lead_id: string;
    readonly email: string;
    readonly ip: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly address: string;
    readonly country: number;
    readonly region: string;
    readonly city: string;
    readonly postcode: string;
    readonly phone: string;
    readonly gender: string;
    readonly birthday: string;
    readonly vertical: string;
    readonly custom1: string;
    readonly custom2: string;
    readonly custom3: string;
    readonly custom4: string;
    readonly custom5: string;
    readonly custom6: string;
    readonly custom7: string;
    readonly custom8: string;
    readonly custom9: string;
    readonly custom10: string;
    readonly public_notes: string;
    readonly private_notes: string;
}

export interface ConversionViewModel {
    email: string;
    ip: string;
    firstname: string;
    lastname: string;
    address: string;
    country: number;
    region: string;
    city: string;
    postcode: string;
    phone: string;
    gender: string;
    birthday: string;
    vertical: string;
    custom1: string;
    custom2: string;
    custom3: string;
    custom4: string;
    custom5: string;
    custom6: string;
    custom7: string;
    custom8: string;
    custom9: string;
    custom10: string;
    public_notes: string;
    private_notes: string;
}

export interface ManagerReportConversionUpsertModel extends ConversionViewModel {
    lead_id: string;
}
