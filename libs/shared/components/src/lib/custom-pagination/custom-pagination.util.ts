import { combineLatest, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

export class CustomPaginationUtil {
    static show$(isLoad$: Observable<boolean>, totalCount$: Observable<number>, containsCount = 9): Observable<boolean> {
        return combineLatest([isLoad$, totalCount$]).pipe(
            map(([isLoad, total]) => isLoad && total > containsCount),
            share()
        );
    }
}
