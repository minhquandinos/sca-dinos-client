import { catchError, delay, MonoTypeOperatorFunction, ObservedValueOf, of, OperatorFunction, retryWhen, scan, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ResolveError, ResolveErrorModel } from '@scaleo/core/error/common';
import { ApiErrorModel } from '@scaleo/core/rest-api/service';

interface EmptyResponseWithPaginationOnCatchErrorType {
    pagination: undefined;
    results: unknown[];
}

export const rxjsOperatorsUtil = (() => {
    const emptyResponseOnCatchError = <T = unknown>(
        response: EmptyResponseWithPaginationOnCatchErrorType | unknown = undefined,
        message: string = 'Catch Error when fetch data'
    ): OperatorFunction<any, ObservedValueOf<T>> =>
        catchError(() => {
            console.error(message);
            return of(response);
        });

    const resolveError = <T = ResolveErrorModel>(): OperatorFunction<any, ObservedValueOf<T>> =>
        catchError((errorResponse: ApiErrorModel) => {
            const error = new ResolveError(errorResponse);
            return throwError(() => ({
                error: new Error(error?.firstValidation || error?.message),
                code: errorResponse.code
            }));
        });

    const retryWithDelay =
        <T>(delayTime: number = 1000, count = 1): MonoTypeOperatorFunction<T> =>
        (input) =>
            input.pipe(
                retryWhen((errors) =>
                    errors.pipe(
                        scan((acc, error) => ({ count: acc.count + 1, error }), {
                            count: 0,
                            error: undefined as any
                        }),
                        tap((current) => {
                            if (current.count > count) {
                                throw current.error;
                            }
                        }),
                        delay(delayTime)
                    )
                )
            );

    return {
        emptyResponseOnCatchError,
        retryWithDelay,
        resolveError
    };
})();
