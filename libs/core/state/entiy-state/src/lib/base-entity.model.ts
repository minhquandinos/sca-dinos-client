import { EntityState } from '@datorama/akita';

export interface BaseEntityInitialState<T> {
    data?: Partial<T>;
    payload?: { [key: string]: any };
    params?: { [key: string]: any };
}

export interface BaseEntityState<T = any, D extends Partial<D> = any> extends EntityState<T>, BaseEntityInitialState<D> {}

export const baseEntityInitialState = <T>(): BaseEntityInitialState<T> => ({
    data: {}
});

export const createEntityInitialState = <T>(state: T) => ({ ...baseEntityInitialState, ...state });
