import { Breakpoints } from '@angular/cdk/layout';

import { MediaQueryEnum } from './media-query.enum';

export type BreakpointsType = keyof typeof Breakpoints | MediaQueryEnum | string;

export enum MediaWatcherDeviceEnum {
    Mobile = 'mobile',
    Tablet = 'tablet',
    Desktop = 'desktop',
    NotMobile = 'notMobile'
}
