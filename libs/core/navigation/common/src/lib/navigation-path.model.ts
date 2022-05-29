import { InjectionToken } from '@angular/core';

import { ReturnConcreteType } from '@scaleo/core/data';

export type NavigationPathsType<T extends string = string> = {
    [key in T]: NavigationPathType;
};

export interface NavigationPathType {
    absolute: string;
    relative: string;
    routePath: string;
}

export const navigationsPaths = <T = unknown>(elem: {
    [key: string]: NavigationPathsType<any> | NavigationPathType;
}): ReturnConcreteType<T> => elem as unknown as ReturnConcreteType<T>;

export interface NavigationPathResolverParams<T> {
    params: T;
}

export interface NavigationPathResolverQueryParams<T> {
    queryParams?: T;
}

export const NAVIGATION_PATH_TOKEN = new InjectionToken('NavigationPath');
