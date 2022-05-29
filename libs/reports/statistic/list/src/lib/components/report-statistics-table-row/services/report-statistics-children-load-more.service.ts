import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

@Injectable()
export class ReportStatisticsChildrenLoadMoreService {
    private _isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    isLoad$ = this._isLoad$.asObservable();

    private _pagination$: BehaviorSubject<ApiPaginationModel> = new BehaviorSubject<ApiPaginationModel>(null);

    pagination$ = this._pagination$.asObservable();

    switchIsLoad() {
        this._isLoad$.next(!this._isLoad$.value);
    }

    setPagination(value: ApiPaginationModel) {
        this._pagination$.next(value);
    }

    get pagination(): ApiPaginationModel {
        return this._pagination$.value;
    }

    get nextPage(): number {
        return this.pagination.current_page + 1;
    }
}
