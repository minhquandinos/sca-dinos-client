import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConfigTableColumn2RequiredService {
    private _requiredColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

    initRequiredColumns(columns: string[]): void {
        this._requiredColumns$.next(columns);
    }

    get requiredColumns(): string[] {
        return this._requiredColumns$.value;
    }

    isRequiredColumns(key: string): boolean {
        if (this.requiredColumns?.length > 0 && key) {
            return this.requiredColumns.includes(key);
        }
        return false;
    }
}
