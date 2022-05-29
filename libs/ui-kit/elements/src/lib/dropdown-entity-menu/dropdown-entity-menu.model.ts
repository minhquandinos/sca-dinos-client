import { Observable } from 'rxjs';

export interface DropdownEntityMenuModel {
    title: Observable<string>;
    action: () => unknown;
    showDivider?: boolean;
    [key: string]: unknown;
}
