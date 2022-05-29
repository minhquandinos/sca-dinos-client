import { Provider } from '@angular/core';
import { BREAKPOINT } from '@angular/flex-layout';

const CUSTOM_BREAKPOINTS = [
    { alias: 'xs', mediaQuery: 'screen and (max-width: 639px)' },
    { alias: 'sm', mediaQuery: 'screen and (max-width: 767px)' },
    { alias: 'md', mediaQuery: 'screen and (max-width: 1024px)' },
    { alias: 'lg', mediaQuery: 'screen and (max-width: 1280px)' },
    { alias: 'xl', mediaQuery: 'screen and (max-width: 1440px)' },
    { alias: 'xxl', mediaQuery: 'screen and (min-width: 1500px)' }
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlexLayoutCustomBreakpointsProvider: Provider = {
    provide: BREAKPOINT,
    useValue: CUSTOM_BREAKPOINTS,
    multi: true
};
