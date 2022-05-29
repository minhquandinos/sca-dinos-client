import { Observable } from 'rxjs';

export interface ManagerOfferListNavigationCountInterface<T = unknown> {
    readonly navCounts$: Observable<T>;
    getCounts(): void;
}
