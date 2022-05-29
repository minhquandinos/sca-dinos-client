export interface FormatServiceInterface {
    get shortDateFormat(): string;

    format(...args: any[]): string;

    formatByKey(...args: any[]): string;
}
