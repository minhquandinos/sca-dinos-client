export type FunctionType<T = void | any> = (...args: any[]) => T;

export type CallbackFnType = () => void;

export type ClassType<T = any> = new (...args: any[]) => T;

export type ConstructorType<T = Record<string, unknown>> = new (...args: any[]) => T;

export type ValuesOf<T extends unknown | unknown[]> = T extends unknown[] ? keyof T[number] : keyof T;

export type ReturnConcreteType<T> = {
    [Property in keyof T]-?: T[Property];
};

export interface ObjectType<T> {
    [key: string]: T;
}

export type UnitsType = 'px' | 'rem' | '%';
