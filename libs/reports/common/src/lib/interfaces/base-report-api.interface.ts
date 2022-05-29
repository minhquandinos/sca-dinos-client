import { Observable } from 'rxjs';

export abstract class BaseReportApiInterface {
    abstract get getColumnsOptions$(): Observable<unknown>;

    abstract get getFilters$(): Observable<unknown>;
}
