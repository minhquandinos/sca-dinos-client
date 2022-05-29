import { Util } from '@scaleo/utils';

import { ReportFilterModel, textareaTypeFilter } from './filter';

export class ConcatReportFilters {
    private hiddenOnTextValue: string[] = ['emptyEmpty'];

    private hiddenOnArrayValue: string[] = [];

    constructor(private filters1: ReportFilterModel[], private filters2: ReportFilterModel[]) {}

    filters(): ReportFilterModel[] {
        if (this.filters1?.length === 0 && this.filters2?.length === 0) {
            return [];
        }

        return this.prepareFilters;
    }

    private get prepareFilters(): ReportFilterModel[] {
        const newFlt: ReportFilterModel[] = [];
        this.mergedFilterValues.forEach((flt) => {
            const index = newFlt.findIndex((el) => el?.filter === flt?.filter);
            const filter = newFlt?.[index];
            if (!filter) {
                let value;

                if (textareaTypeFilter.includes(flt?.filter)) {
                    value = flt.value.toString().split(',').join('\n');
                } else {
                    if (Array.isArray(flt?.value)) {
                        value = this.removeHiddenValue(flt.value as any);
                    }

                    if (typeof flt?.value === 'string') {
                        value = this.removeHiddenValue(
                            flt.value
                                .toString()
                                .split(',')
                                .map((el) => {
                                    if (Util.isNumber(el)) {
                                        return Util.stringToNumber(el);
                                    }
                                    return el;
                                }) as any[]
                        );
                        console.log('offer', value);
                    }
                }

                newFlt.push({
                    ...flt,
                    value
                });
            } else {
                const filterValue = this.removeHiddenValue(filter.value as any);
                const fltValue = this.removeHiddenValue(flt.value as any);
                const concatValue = this.concatValue(filterValue, fltValue);
                if (concatValue) {
                    newFlt[index] = {
                        ...flt,
                        value: concatValue
                    };
                }
            }
        });

        return newFlt;
    }

    private concatValue(value: string[], newValue: string[]): string[];
    private concatValue(value: number[], newValue: number[]): number[];
    private concatValue(value: number, newValue: number): number;
    private concatValue(value: string, newValue: string): number;
    private concatValue(value: any, newValue: any): number[] | string[] | number | string {
        if (Array.isArray(value) && Array.isArray(newValue)) {
            return [...new Set([...value, ...newValue])];
        }

        if ((typeof value === 'string' && typeof newValue === 'string') || (typeof value === 'number' && typeof newValue === 'number')) {
            return value
                .toString()
                .split('\n')
                .concat(newValue.toString().split('\n'))
                .filter((str) => !this.hiddenOnTextValue.includes(str))
                .join('\n');
        }

        return undefined;
    }

    private removeHiddenValue(value: string[]): string[];
    private removeHiddenValue(value: number[]): number[];
    private removeHiddenValue(value: number): number;
    private removeHiddenValue(value: string): string;
    private removeHiddenValue(value: any): string | any {
        if (Array.isArray(value)) {
            return this.filterArrayValue(value);
        }

        if (typeof value === 'string' || typeof value === 'number') {
            return this.filterTextValue(value);
        }

        return undefined;
    }

    private filterTextValue(value: number | string): string | number {
        return value
            .toString()
            .split('\n')
            .filter((str) => !this.hiddenOnTextValue.includes(str))
            .join('\n');
    }

    private filterArrayValue(value: number[] | string[]): string[] | number[] {
        return value;
    }

    private get mergedFilterValues(): ReportFilterModel[] {
        return [...this.filters1, ...this.filters2].reduce((acc: ReportFilterModel[], reportFilter: ReportFilterModel) => {
            const index = acc.findIndex((elem) => elem?.filter === reportFilter?.filter);
            if (index !== -1) {
                acc[index] = { ...acc[index], ...reportFilter };
            } else {
                acc.push(reportFilter);
            }
            return acc;
        }, []);
    }
}
