import { Pipe, PipeTransform } from '@angular/core';

export enum ComparisonOperatorsEnum {
    StrictEqual = 'strictEqual',
    NotEqual = 'notEqual',
    GreaterThan = 'greaterThan',
    LessThan = 'lessThan',
    GreaterThanOrEqualTo = 'greaterThanOrEqualTo',
    LessThanOrEqualTo = 'lessThanOrEqualTo'
}

type ComparisonOperatorsType = keyof Record<ComparisonOperatorsEnum, string>;

@Pipe({
    name: 'isTruthy'
})
export class IsTruthyPipe implements PipeTransform {
    transform(value: number, valueForCheck: number, condition?: ComparisonOperatorsType): boolean;
    transform(value: string, valueForCheck: string, condition?: ComparisonOperatorsType): boolean;
    transform(value: any, valueForCheck: any, condition: ComparisonOperatorsType = ComparisonOperatorsEnum.StrictEqual): boolean {
        switch (condition) {
            case ComparisonOperatorsEnum.NotEqual:
                return value !== valueForCheck;
            case ComparisonOperatorsEnum.GreaterThan:
                return value > valueForCheck;
            case ComparisonOperatorsEnum.GreaterThanOrEqualTo:
                return value >= valueForCheck;
            case ComparisonOperatorsEnum.LessThan:
                return value < valueForCheck;
            case ComparisonOperatorsEnum.LessThanOrEqualTo:
                return value <= valueForCheck;
            case ComparisonOperatorsEnum.StrictEqual:
            default:
                return value === valueForCheck;
        }
    }
}
