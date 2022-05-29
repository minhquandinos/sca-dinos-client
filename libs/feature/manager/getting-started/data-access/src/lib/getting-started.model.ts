import { BooleanEnum } from '@scaleo/core/data';

export interface RoutesForGettingStarted {
    title: string;
    router: string;
    complete: boolean;
    stage: string;
}

export interface GettingStartedCompleteModel {
    getting_started_stage1: BooleanEnum;
    getting_started_stage2: BooleanEnum;
    getting_started_stage3: BooleanEnum;
    getting_started_stage4: BooleanEnum;
}
