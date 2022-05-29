export interface ManagerAdjustmentUpsertModel {}

export interface ManagerAdjustmentUpsertConditionsModel {
    key: string;
    value?: any;
    dates_range?: {
        from?: string;
        to?: string;
    };
}

export interface AdjustmentUpsertModel {
    id: number;
    action_id: number;
    details: any;
    conditions: any;
    parameters: any;
    notes: string;
    status: number;
    fire_affiliate_postback: number;
    affected: number;
    added_date: string;
    added_timestamp: string;
    change_date?: number;
    filename?: string;
    source_file?: File;
}

export interface AdjustmentUpsertRequestModel extends AdjustmentUpsertModel {
    details: string;
    conditions: string;
    parameters: string;
}
