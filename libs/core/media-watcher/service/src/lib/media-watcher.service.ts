import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaQueryEnum } from './media-query.enum';
import { BreakpointsType } from './media-watcher.model';

@Injectable()
export class MediaWatcherService {
    readonly isDesktop$ = this.isMatched$('Web');

    readonly isDesktopOrTablet$ = this.isMatched$(['Web', 'Tablet']);

    readonly isTablet$ = this.isMatched$('Tablet');

    readonly isMobile$ = this.isMatched$([MediaQueryEnum.XSmall]);

    readonly isNotMobile$ = this.isMobile$.pipe(map((value) => !value));

    constructor(public readonly breakpointObserver: BreakpointObserver) {}

    isMatched$(breakpoints: BreakpointsType | BreakpointsType[]): Observable<boolean> {
        return this.breakpointObserver.observe(this.breakpoints(breakpoints)).pipe(map(({ matches }) => matches));
    }

    isMatched(breakpoints: BreakpointsType | BreakpointsType[]): boolean {
        return this.breakpointObserver.isMatched(this.breakpoints(breakpoints));
    }

    get isMobile(): boolean {
        return this.isMatched(['(max-width: 640px)']);
    }

    private breakpoints(breakpoints: BreakpointsType | BreakpointsType[]): string | string[] {
        let breakpointMediaQueries: string | string[];
        if (Array.isArray(breakpoints)) {
            breakpointMediaQueries = breakpoints.map((breakpoint) =>
                Breakpoints[breakpoint as keyof typeof Breakpoints] ? Breakpoints[breakpoint as keyof typeof Breakpoints] : breakpoint
            );
        }
        if (typeof breakpoints === 'string') {
            breakpointMediaQueries = Breakpoints[breakpoints as keyof typeof Breakpoints];
        }
        return breakpointMediaQueries;
    }
}
