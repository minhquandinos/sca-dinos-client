export interface ConfigTableColumn2Model {
    default: number;
    group: string;
    groupSort: number;
    key: string;
    label: string;
    reportSort: number;
    sort: number;
    items: ConfigTableColumn2Model[];
}

export type ConfigTableType = ConfigTableEnum.LeadsList | ConfigTableEnum.LeadsLogs | string;

export enum ConfigTableEnum {
    LeadsList = 'leads-list',
    LeadsLogs = 'leads-logs'
}

export interface ConfigCheckedColumnModel {
    key: string;
    checked: boolean;
    reportSort: number;
}
