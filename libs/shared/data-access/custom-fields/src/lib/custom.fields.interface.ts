export interface FieldsInterface {
    // 'custom-fields': CustomFieldInterface[];
    'standard-fields': CustomFieldInterface[];
    types: TypesInterface;
}

export interface CustomFieldInterface {
    data_type_id: number;
    description: string;
    display_type_id: number;
    field_name: string;
    field_type_id: number;
    id: number;
    title: string;
}

export interface TypesInterface {
    'data-types': TypesFieldsBaseInterface[];
    'display-types': TypesFieldsBaseInterface[];
    'fields-types': TypesFieldsBaseInterface[];
}

export interface TypesFieldsBaseInterface {
    id: number;
    title: string;
}

export enum FieldTypeIdEnum {
    Input = 1,
    TextArea = 2,
    Checkbox = 3
}

export type CustomFieldsRoleType = 'affiliate' | 'advertiser';
